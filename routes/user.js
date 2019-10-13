const express = require('express');

//Libreria para encriptar la 
const bcrypt = require('bcrypt'); 

// Underscore
const _ = require('underscore');

const Usuario = require('../models/user');
const { verificaToken, verificaAdminRol } = require('../middlewares/auth');

const app = express();


app.get('/api/users', verificaToken, (req, res) => {
    /*
    return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email,
    });*/
    let since = Number(req.query.since) || 0;
    let limit = Number(req.query.limit) || 5;
     

    // buscar todos los registros de la coleccion
    Usuario.find({ estado: true }, 'nombre email ima role estado google')//filtra los campos que devuelve el get
    .skip(since)// desde donde inicia la busqueda de registros
            .limit(limit)// límito la cantidad de registros
            .exec( (error, usuarios) => {
                if ( error ) {
                    res.status(400).json({
                        ok: false,
                        error
                    });
                }
                // retorna cantidad de usuarios activos => estado: true
                Usuario.countDocuments({ estado: true }, (error, cantidad) => {
                    res.json({
                        ok: true,
                        cantidad_de_registros: cantidad,
                        usuarios// retorna todos los usuarios de la BBDD filtrados
                        
                    })
                })
            })
});

app.post('/api/user', [verificaToken, verificaAdminRol], (req, res) => {
    let body = req.body;
    
    let usuario = new Usuario({
        name: body.name,
        middlename: body.middlename,
        lastname: body.lastname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //hash para encriptar la contraseña
        role: body.role,
        img: body.img,
    });

    usuario.save( (error, usuarioDB) => {
        if( error ) {
            return res.status(400).json({
                ok: false,
                error: error
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});
app.put('/api/user/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'middlename', 'lastname', 'email', 'ima', 'role', 'state']);

    
    Usuario.findByIdAndUpdate(id, body, { new : true, runValidators : true }, (error, usuarioDB) => {
        if ( error ) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

    
});
app.delete('/api/user/:id', [verificaToken, verificaAdminRol], (req, res) => {
    
    let id = req.params.id;
    let cambiarEstado = {
        state: false
    };
    
    Usuario.findByIdAndUpdate(id, cambiarEstado, (error, usuarioBorrado) => {
        if( error ){
            return res.status(400).json({
                ok: false,
                error
            }
        )};

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            })
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })
    
});

module.exports = app
