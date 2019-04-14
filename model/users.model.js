const connection = require('./connection');

const userModel = {

  table : 'users',

  /**
   * Crear un nuevo usuario.
   * Los datos que deben ser pasados, no pueden ser distintos a name, lastname, email y password
   * @param fields Datos a ser guardados
   * @param callback Funcion que será usada para reportar error, resultados, o problema
   */
  createUser: ( fields, callback )=> {

    // Verificar si el email está disponible
    connection.query('SELECT id FROM users WHERE email = ?', [ fields.email ], function( selecterror, data ){
      if (selecterror ){
        callback(selecterror, null );
      }else{

        // Email no está disponible
        if ( data.length > 0 ){
          callback(null, 'email_unval', null );
          return
        }else{
        // El email está disponible
          fields.registerat = new Date().toISOString().slice(0, 19).replace('T', ' ');
          let sql = `INSERT INTO users SET ?`;
          connection.query(sql, fields, function (insertError, result) {

            if (insertError) {
              callback(insertError, null);
              return;
            };

            callback(null, 'email_val', result);

          });
        }
      }

    } ); // Final de query select email

  }
}

module.exports = userModel;