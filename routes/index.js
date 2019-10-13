const express = require('express');
const app = express();

// Rutas de la aplicación
app.use(require('./user'));
app.use(require('./login'));
app.use(require('./player'));



module.exports = app;