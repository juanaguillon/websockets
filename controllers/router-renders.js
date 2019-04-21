const productsmodel = require('../model/product.model');
const accounting = require('accounting-js');


const renders = {
  // products
  getAllProducts: ( req, res ) => {

    productsmodel.getAllProducts( function( err, data ){
      if ( err ){
        res.sendStatus(500);
      }else{
        res.render('products', {
          products: data,
          accoptions: {
            symbol: '$',
            precision: 0,
            thousand: "."
          },
          listensocket:true,
          accounting: accounting.formatMoney
          
        })
      }
    } )
  }
}

module.exports = renders;