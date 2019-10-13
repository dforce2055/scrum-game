const express = require('express');

//Libreria para encriptar la 
const bcrypt = require('bcrypt');

// Jason Web Token
var jwt = require('jsonwebtoken');

// Google Signin
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// Underscore
const _ = require('underscore');

const router = express.Router();
const Usuario = require('../models/user');

const app = express();

app.post('/login', function (req, res) {
    let body = req.body;

    //console.log(`Email enviado: ${body.email}`);

    Usuario.findOne({ email: body.email }, (error, usuarioDB) => {
        if ( error ) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if ( usuarioDB.estado === false ) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'El Usuario no esta autorizado para iniciar sesión'
                }
            });
        }

        if ( !usuarioDB ) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if ( !bcrypt.compareSync( body.password, usuarioDB.password ) ) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'usuario o contraseña incorrectos'
                }
            });
        }
        
        // Genera Token valido
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN })

        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});


// Configuraciones de Google

async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload(); //Datos del usuario autenticado
    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
    
}
//verify().catch(console.error);

/*
app.post('/google', async (req, res) => {
    let token = req.body.idtoken;
    // Verifica el token de Google
    let googleUser = await verify(token)
                            .catch(error => {
                                return res.status(403).json({
                                    ok: false,
                                    error
                                });
                            });

    // Verifica si existe el usuario en la BBDD
    Usuario.findOne( { email: googleUser.email }, (error, usuarioDB) => {
        if ( error ) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'No existe su dirección de correo en el sistema'
                }
            });
        };

        // Si el usuario existe, verifico que pueda iniciar sesión con sus credenciales de Google
        if ( usuarioDB ) {
            if (usuarioDB.google === false ) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Debe utilizar su autenticación normal (no de Google)'
                    }
                });
            } else {
                // Genera Token valido
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })

            }
        } else {
            // Nuevo usuario, no existente en la BBDD
            let usuario = new Usuario();

            usuario.nombre = googleUser.name;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((error, usuarioDB) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        error: error
                    });
                };

                // Genera Token valido
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            });
        };
    });
});
*/




module.exports = app