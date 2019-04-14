const mysql = require('mysql');

/**
 * Crear conexión mysql.
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "websockets"
});

connection.connect( ( err )=>{
  if ( err ) console.log( err );
  return;
});

module.exports = connection;




