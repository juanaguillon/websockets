const mysql = require('mysql');
const variables = require('../controllers/variables');

/**
 * Crear conexión mysql.
 */


const connection = mysql.createConnection({
  host: variables.DATABASE_HOST ,
  user: variables.DATABASE_USER,
  password: variables.DATABASE_UPASS,
  database: variables.DATABASE_NAME
});

connection.connect( ( err )=>{
  if ( err ) console.log( err );
  return;
});

module.exports = connection;




