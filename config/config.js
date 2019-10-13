/**
 * ENTORNO
 * Si existe la variable NODE_ENV se asigna (en HEROKU)
 * Si estamos en localhost se asigna 'dev' 
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Vencimiento del TOKEM
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 días
 */
process.env.CADUCIDAD_TOKEN = '48h';

/**
 * TOKEN
 * Variable de Entorno en HEROKU => SEED_TOKEN
 */
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrollo';


/**
 * PUERTO
 * Si existe la variable PORT se asigna
 * Sino se asigna puerto 5000
 */
process.env.PORT = process.env.PORT || 5000;

/**
 * BASE DE DATOS
 * Si existe la variable PORT se asigna
 * Variable de Entorno en HEROKU => MONGO_URL
 * 
 */
let urlMONGO;
if ( process.env.NODE_ENV === 'dev' ) {
    urlMONGO = 'mongodb://localhost/scrumgame';
} else {
    urlMONGO = process.env.MONGO_URL;
}
//Asigno el resultado a la variable MONGO_URL
process.env.MONGO_URL = urlMONGO;

/**
 * BASE DE DATOS MySQL
 */
//let urlMySQL;
if( process.env.NODE_ENV === 'dev' ) {
    process.env.MYSQL_URL = 'mysql://root:lsfalv@localhost:3306/scrumgame';
} else {
    process.env.MYSQL_URL = process.env.MYSQL_URL;
}



/**
 * GOOGLE CLIENT ID 
 */

process.env.CLIENT_ID = process.env.CLIENT_ID || '824654093707-jmmejb7c5un3fqa5o5mjs8vvd37atpr0.apps.googleusercontent.com';