const connection  = require('./connection');
const productmodel = {

  createProduct: ( fields, callback ) => {

    connection.query('INSERT INTO products SET ?', fields, function( err, data ){
      callback(err, data )
    } )
  }
  
}

module.exports = productmodel;