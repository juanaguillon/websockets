// SECTION Funciones generales

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

  $('#register_box .loading_spin_container').removeClass('none');
  
  let name = $('#nombre_register').val();
  let lname = $('#lastname_register').val();
  let email = $('#email_register').val();
  let pass = $('#pass_register').val();
  let rpass = $('#rpass_register').val();
  

  var messageContainer = $('.register_box article');
  var messageBody = $('.register_box article .message-body');

  if (name == '' || email == '' || pass == '' || rpass == '' || lname == '' ){
    // Todos los campos son requeridos

    messageContainer.removeClass('none')
    messageBody.html('Todos los campos son requeridos')
    return;


  } else if ( ! exemail.test(email) ){
    // Dirección de email no admitida

    messageContainer.removeClass('none')
    messageBody.html('El email es inválido')
    return;

  }else if ( rpass !== pass ){
    // Contraseñas distintas
    messageContainer.removeClass('none')
    messageBody.html('Las contraseñas no coinciden')
    return;

  }else {
    messageContainer.addClass('none')
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
        $('#register_box .loading_spin_container').addClass('none');

        if ( res.stat ){
          messageContainer.removeClass('none is-danger');
          messageContainer.addClass('is-success');
          messageBody.html('Usuario guardado correctamente')
        }else{
          messageContainer.removeClass('none');

          if ( res.message == 'email_unval'){
            // Email no disponible
            messageBody.html('Dirección email no disponible, intente una distinta.');

          }else{
            // Error de servidor
            messageBody.html('Error al guardar el usuario, intente nuevamente.');
          }
        }
      }
    })
  }

});

// !SECTION Final - Formulario registro de usuario

// SECTION Ingreso de usuario

$('#login_form').submit( function( e ){
  e.preventDefault();

  $('#login_box .loading_spin_container').removeClass('none');

  let email = $('#email_login').val();
  let pass = $('#pass_login').val();

  if ( email == '' || pass == ''){
    $('#login_box article.message').removeClass('none');
    $('#login_box .message-body').html('Todos los campos son requeridos')
  }else if ( ! exemail.test( email ) ){
    $('#login_box article.message').removeClass('none');
    $('#login_box .message-body').html('El email ingresado no es válido');
  }else{
    $.ajax({
      url: '/login',
      method: 'post',
      data: {
        email: email,
        password: pass
      },
      success: function( e ){
        $('#login_box .loading_spin_container').addClass('none');
        if ( e.stat ){
          window.location.href = '/private';
        }else if ( !e.stat && e.message == 'no_results' ){
          $('#login_box article.message').removeClass('none');
          $('#login_box .message-body').html('Usuario o contraseña incorrecta. Intente nuevamente.');

        }
      }
    })
  }

} )

// !SECTION

// SECTION Crear producto

$('#create_product_form').submit( function( e ){
  e.preventDefault();
  $('#create_product_box .loading_spin_container').removeClass('none');
  var name = $('#name_product').val()
  var price = $('#price_product').val()
  var desc = $('#desc_product').val()
  var image = $('#image_product')[0].files[0];
  if ( name == '' ){
    $('#create_product_box .loading_spin_container').addClass('none');
    $('#create_product_box article.message').removeClass('none')
    $('#create_product_box .message-body').html('Debe proporcionar un mombre a el producto')
  }else if ( price == ''){
    $('#create_product_box .loading_spin_container').addClass('none');
    $('#create_product_box article.message').removeClass('none')
    $('#create_product_box .message-body').html('Debe proporcionar un precio a el producto')
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
      // data:{
      //   name: name,
      //   price: price,
      //   desc:desc
      // },
      success: function( e ){
        $('#create_product_box .loading_spin_container').addClass('none');
        console.log( e );
      }
    })
  }
})

// !SECTION