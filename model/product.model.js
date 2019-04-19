const connection  = require('./connection');
const productmodel = {

  /**
   * Crear un nuevo producto
   * @param fields Objeto con valores clave valor
   * @param callback Función con parametros error, data
   */
  createProduct: ( fields, callback ) => {

    connection.query('INSERT INTO products SET ?', fields, function( err, data ){
      callback(err, data )
    } )
  },

  /**
   * Obtener todos los datos registrados
   * @param callback Funcion con parametros error , data
   */
  getAllProducts:( callback ) => {
    connection.query('SELECT * FROM products', function( err, data ){
      callback(err, data)
    });
  }


  
}

module.exports = productmodel;