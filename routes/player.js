const { verificaToken, verificaAdminRol } = require('../middlewares/auth');
const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
// Conexión a mysql
let mysql = require('mysql');

// Conexión a mysql compatible con HEROKU
let mysqlConnection = mysql.createConnection(process.env.MYSQL_URL);

const app = express();
const collection = 'players'; 

app.get('/api/players', /*[verificaToken],*/ (req, res) => {
    mysqlConnection.connect(function (err) {
        if (err) {
            //throw err;
            console.log("No pude conectarme a MySQL".red);
        }
        //console.log("Conectado a MySQL!".red);

        const sql =
            `select *
                from ${ collection }`;

        mysqlConnection.query(sql, function (err, players, fields) {
            mysqlConnection.end();
            if (err) throw err;

            console.log(`Consultando players`);
            const productos = JSON.parse(JSON.stringify(players));
            //console.log(productos);
            res.json(productos)
        });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + '/client/build/index.html'));
//});

module.exports = app;