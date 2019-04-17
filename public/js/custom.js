$('.navbar-burger').click( function( ){
  $(".navbar-burger").toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
})

const exemail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/;

$('#navbarBasicExample .has-dropdown').click(function( ){
  $(this).toggleClass('is-active');
});

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