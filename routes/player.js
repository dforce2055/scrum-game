const { verificaToken, verificaAdminRol } = require('../middlewares/auth');
const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const colors = require('colors');
// Conexión a mysql
const mysql = require('mysql');

// Conexión a mysql compatible con HEROKU
const mysqlConnection = mysql.createConnection(process.env.MYSQL_URL);
mysqlConnection.connect(function (err) {
    if (err) {
        console.error('MySQL error: ' + err.message);
        return;
    }
    console.log(`Conectado a MySQL Id:- ${mysqlConnection.threadId}` .green );
});
const collection = 'players'; 

const app = express();


app.get('/api/players', /*[verificaToken],*/ (req, res) => {
    const sql =`
                select *
                from ${ collection }
            `;

    mysqlConnection.query(sql, function (err, players, fields) {
        if (err) throw err;

        console.log(`Consultando players`);
        const jugadores = JSON.parse(JSON.stringify(players));

        res.json(jugadores)
    });
});

app.post('/api/player', /*[verificaToken],*/(req, res) => {
    let body = req.body;
    console.log("Insertando un player...");

    const sql = `
                INSERT INTO ${collection}(name, \`middle-name\`, \`last-name\`, age, email, state, \`role\`,\`level\`)
                VALUES('${body.name}', '${body.middlename}', '${body.lastname}' , '${body.age}', '${body.email}', 1, '${body.role}', '${body.level}')
            `;

    mysqlConnection.query(sql, function (err, result) {
        //mysqlConnection.end();
        if (err) throw err;

        console.log("1 player inserted, ID: " + result.insertId);
        res.json({
            ok: true,
            id_nuevo_jugador: result.insertId
        })
    });
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + '/client/build/index.html'));
//});

module.exports = app;