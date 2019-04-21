// Funciones en tiempo real.

const productModel = require('../model/product.model');

class routerSocket {

  constructor( iosocket ){
    this.iosocket = iosocket;
  }

  initSocket( ){
    this.iosocket.on('connection', ( socket )=>{
      this.createProduct( socket )
    });
  }

  createProduct( socketProduction ){

    socketProduction.on('create_product', ()=> {

      productModel.getAllProducts((err, data) => {
        if (err) console.log('SOCKET: Error al obtener los productos');
        if (!err) this.iosocket.emit('show_products', data);
      });

    });
  }

}

module.exports = routerSocket;