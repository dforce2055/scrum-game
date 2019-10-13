require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexión a mysql
//const mysqlConnection = require('./config/mysql-db');


// path para carpeta public
const path = require('path');

//DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const colors = require('colors');
const bodyParser = require('body-parser');

// Midlewhere
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, './public')));


// Rutas
app.use(require('./routes/index'));


// DB Conection
mongoose.connect(process.env.MONGO_URL,  
     {useNewUrlParser: true, useUnifiedTopology: true },
    (error, res) => {
        if ( error ) throw error.red;
        else console.log('Conectado a Mongo'.green);
    });

// Conexión a mysql
//mysqlConnection.pruebaConexion();
//mysqlConnection.exportarCSV();
   

app.listen(process.env.PORT, () => {
    console.log(`Escuchando Puerto: ${process.env.PORT}`.green);
});



