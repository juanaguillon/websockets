const variables = require('./variables');
class functions {

  getHomeUrl ( ) {
    return variables.HOME_URL;
  }
  /**
   * Obtener ruta para subir imágenes.
   */
  getUploadedFolder ( ) {
    return 'public/images/'
  }
  /**
   * Subir una nueva imagen a el servidor
   * @param file Objeto req.files.img completo, para usar la funcion mv
   * @param name Nombre de la imagen.
   * @param callback Funcion de con parámetro error en caso de existir.
   */
  uplaodImage( file, name , callback ){
    file.mv(this.getUploadedFolder() + name , function( err ) {
      console.log( err );
      callback( err )
    } )
  }
  /**
   * Obtener la fecha/hora actual ( Estilo SQL )
   */
  getNow( ){
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
  /**
   * Obtener un id unico basado en el tiempo actual
   * @see Function NewDate().getTime() Javascript
   */
  getUniqueTime( ) {
    return new Date().getTime();
  }

}  



module.exports = new functions;