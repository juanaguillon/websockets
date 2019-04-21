// SECTION Funciones generales


var socket = io.connect('http://localhost:8080', { forceNew: true })

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function (n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


function toggleSpinnerContainer( selector ){
  $( selector + ' .loading_spin_container').toggleClass('none');
}

function toggleMessage(selector, message, className = 'is-danger' ){
  var element = $(selector + ' .message');

  if ( ! element.hasClass('is-danger') || className !== 'is-danger'){
    element.removeClass()
    element.addClass('message ' + className );
  }


  
  element.removeClass('none')
  element.children('.message-body').html( message );

  
}

// !SECTION

// SECTION Ejecuciones generales


$('.navbar-burger').click( function( ){
  $(".navbar-burger").toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
})


$('.has-dropdown').click(function( ){
  $(this).toggleClass('is-active');
});

$('.file-input').change( function( e ){
  var file = e.target.files[0] || null
  if ( file && file.name != ''){
    $(this).siblings('.file-name').text( file.name )

  }else{
    $(this).siblings('.file-name').text('Sin archivo')
  }
})



// !SECTION

const exemail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/;
// SECTION Formulario - Registro de usuario
$('#register_form').submit( function( e ){

  e.preventDefault();

  toggleSpinnerContainer('#register_box')
  
  let name = $('#nombre_register').val();
  let lname = $('#lastname_register').val();
  let email = $('#email_register').val();
  let pass = $('#pass_register').val();
  let rpass = $('#rpass_register').val();
  


  if (name == '' || email == '' || pass == '' || rpass == '' || lname == '' ){
    // Todos los campos son requeridos
    toggleSpinnerContainer('#register_box')
    toggleMessage("#register_box", 'Todos los campos son requeridos')
    return;

  } else if ( ! exemail.test(email) ){
    // Dirección de email no admitida
    toggleSpinnerContainer('#register_box')
    toggleMessage("#register_box", 'El email es inválido')
    return;

  }else if ( rpass !== pass ){
    // Contraseñas distintas
    toggleSpinnerContainer('#register_box')
    toggleMessage("#register_box", 'Las contraseñas no coinciden')
    return;

  }else {
    $.ajax({
      url: '/register-form',
      data: {
        name: name,
        lastname: lname,
        email: email,
        password: pass
      },
      method: 'post',
      success:function( res ){

        // Ocultar spiner cuando haya finalizado el ajax
        toggleSpinnerContainer('#register_box')

        if ( res.stat ){

          toggleMessage("#register_box", 'Usuario guardado correctamente', 'is-success')

        }else{
          var message = ""
          if ( res.message == 'email_unval'){
            // Email no disponible
            message = "Dirección email no disponible, intente una distinta."

          }else{
            // Error de servidor
            message = "Error al guardar el usuario, intente nuevamente."
          }

          toggleMessage('#register_box', message );
        }
      }
    })
  }

});

// !SECTION Final - Formulario registro de usuario

// SECTION Ingreso de usuario

$('#login_form').submit( function( e ){
  e.preventDefault();

  toggleSpinnerContainer("#login_box")

  let email = $('#email_login').val();
  let pass = $('#pass_login').val();

  if ( email == '' || pass == ''){
    toggleSpinnerContainer("#login_box")
    toggleMessage('#login_box', "Todos los campos son requeridos" )
  }else if ( ! exemail.test( email ) ){
    toggleSpinnerContainer("#login_box")
    toggleMessage('#login_box', "El email ingresado no es válido")
  }else{
    $.ajax({
      url: '/login',
      method: 'post',
      data: {
        email: email,
        password: pass
      },
      success: function( e ){
        toggleSpinnerContainer("#login_box" )
        if ( e.stat ){
          window.location.href = '/private';
        }else if ( !e.stat && e.message == 'no_results' ){

          toggleMessage('#login_box', "Usuario o contraseña incorrecta. Intente nuevamente.")

        }
      }
    })
  }

} )

// !SECTION

// SECTION Crear producto

$('#create_product_form').submit( function( e ){
  e.preventDefault();
  toggleSpinnerContainer('#create_product_box')
  var name = $('#name_product').val()
  var price = $('#price_product').val()
  var desc = $('#desc_product').val()
  var image = $('#image_product')[0].files[0];
  if ( name == '' ){
    toggleSpinnerContainer('#create_product_box')
    toggleMessage('#create_product_box','Debe proporcionar un mombre a el producto');

  }else if ( price == ''){
    toggleSpinnerContainer('#create_product_box');
    toggleMessage('#create_product_box', 'Debe proporcionar un precio a el producto');
  }else{
    console.log(image )
    var formdata = new FormData();
    formdata.append('name', name)
    formdata.append('price', price)
    formdata.append('desc', desc)
    formdata.append('image', image)
    $.ajax({
      url: '/create-product',
      type:'POST',
      data: formdata,
      cache: false,
      processData: false, // important
      contentType: false, // important
      
      success: function( e ){
        toggleSpinnerContainer('#create_product_box');
        console.log( e );
        if ( !e.stat ){
          toggleMessage('#create_product_box', 'Error al crear el producto. Intente nuevamente');

        }else{
          socket.emit('create_product');
          if (e.message == 'err_upload_file'){
            toggleMessage('#create_product_box', 'El producto se ha creado, pero la imagen no se ha logrado subir.', 'is-warning');
          } else if (e.message == 'product_created'){
            toggleMessage('#create_product_box', 'Producto creado correctamente.', 'is-success');
          }
          $('#create_product_form').trigger('reset');
        }
        
      }
    })
  }
})

// !SECTION