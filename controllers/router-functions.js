/*
 * Este archivo se usará en las rutas del proyecto, y será encargada de los procesos correspondientes HTTP POST de cada ruta.
 */

/** Modelo usuario, funciones para llamar datos del servidor mysql. */
const usermodel = require('../model/users.model');
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
          res.send({stat:true});
        }
        

      }
    })
  }
}

module.exports = routerFunctions;