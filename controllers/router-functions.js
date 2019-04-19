/*
 * Este archivo se usará en las rutas del proyecto, y será encargada de los procesos correspondientes HTTP POST de cada ruta.
 */

/** Modelo usuario, funciones para llamar datos del servidor mysql. */
const usermodel = require('../model/users.model');
/** Modelo productos */
const productsmodel = require('../model/product.model');
const functions = require('./functions');

const routerFunctions = {

  /** PATH: register-form */
  registerUser: ( req, res ) => {

    usermodel.createUser(req.body, function (err, message, data) {


      // Si las filas fueron afectadas ( Si se ha guardado )
      
      if (message == 'email_val' && data.affectedRows > 0){
        res.send({ stat: true });
      } else if (message == 'email_unval' ){
        res.send({ stat: false, message: message });
      }else{
        res.send({ stat: false, message: 'server_error' })
      }
    })
  },
  // PATH: login
  loginUser:( req, res ) => {
    usermodel.getUserByEmail( req.body.email, ( err, message, data ) => {
      if ( err ) {
        res.status(500).send({stat:false, message: 'server_error'});
        return;
      }

      if ( message == 'no_results' ){
        // No se ha encontrado ningun correo electrónico
        res.send({stat:false, message: message });
      }else if( message == 'results'){

        if ( data.password !== req.body.password ){
          // Las contraseñas son distintas
          res.send({ stat: false, message: 'no_results' });
        }else if( data.password === req.body.password ){
          // Contraseñas idénticas
          req.session.uid = data['id'];
          req.session.name = data['name'];
          req.session.lastname = data['lastname'];
          req.session.email = data['email'];

          res.send({stat:true});
        }


      }
    })
  },

  // PATH: create-product
  createProduct:( req, res )=>{
    let d = req.body;
    let files = req.files;

    
    if ( Object.keys(d).length == 0 || d.name == '' || d.price == '' ){
      res.send({stat:false, message: 'server_error'});
      return false;
    }
    /** Datos que serán enviados a guardar en la base de datos. */
    let data = {
      name_prod: d.name,
      price_prod: parseInt(d.price),
      desc_prod: d.desc || null,
      registerat_prod: functions.getNow(),
      image_prod: 'default.jpg',
      userid_prod: req.session.uid
    }

    // Si existe la imágen, el nombre image_prod será remplazado, y se adiciona un numero único a esta imagen.
    const actualID = functions.getUniqueTime()
    if (files.image) {
      data.image_prod = actualID + files.image.name ;
    }

    // Llamar método para crear producto.
    productsmodel.createProduct( data, ( err , dataRet ) => {
      if ( err ) {
        res.send({stat:false, message:'server_error'})
      }else{
        if ( dataRet.affectedRows > 0 ){
          functions.uplaodImage(files.image, actualID + files.image.name , function( err ){
            if ( err ){
              res.send({stat:true,message:'err_upload_file'})
            }else{
              res.send({stat:true,message:'product_created'})
            }
          } )
        }else{
          res.send({ stat: false, message: 'server_error' })
        }
      }


    });

  }

}

module.exports = routerFunctions;