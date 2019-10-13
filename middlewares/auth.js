// ===================
//   Verifica TOKEN
// ===================
const jwt = require('jsonwebtoken');

let verificaToken = ( req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED_TOKEN, (error, decoded) => {
        if( error ) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Token invalido'
                }
            });
        }

        req.usuario = decoded.usuario;
        // continua con la llamada
        next();
    });
    
};

// ===================
// Verifica ADMIN_ROLE
// ===================

let verificaAdminRol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'El usuario no tiene permisos suficientes'
            }
        });
        
    }
};

module.exports = {
    verificaToken,
    verificaAdminRol
}