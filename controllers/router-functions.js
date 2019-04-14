/**
 * Este archivo se usará en las rutas del proyecto, y será encargada de los procesos correspondientes HTTP POST de cada ruta.
 */

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
  }
}

module.exports = routerFunctions;