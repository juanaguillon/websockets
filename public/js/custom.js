$('.navbar-burger').click( function( ){
  $(".navbar-burger").toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
})

$('#navbarBasicExample .has-dropdown').click(function( ){
  $(this).toggleClass('is-active');
});

$('#register_form').submit( function( e ){

  e.preventDefault();
  
  let name = $('#nombre_register').val();
  let email = $('#email_register').val();
  let pass = $('#pass_register').val();
  let rpass = $('#rpass_register').val();
  let exemail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/;

  if ( name == '' || email == '' || pass == '' || rpass == '' ){
    // Todos los campos son requeridos

    $('.register_box article').removeClass('none')
    $('.register_box article .message-body').html('Todos los campos son requeridos')
    return;

    
  } else if ( ! exemail.test(email) ){
    // Dirección de email no admitida

    $('.register_box article').removeClass('none')
    $('.register_box article .message-body').html('El email es inválido')
    return;
    
  }else if ( rpass !== pass ){
    // Contraseñas distintas
    $('.register_box article').removeClass('none')
    $('.register_box article .message-body').html('Las contraseñas no coinciden')
    return;
  }else {
    $('.register_box article').addClass('none')
    $.ajax({
      url: '/register-form',
      data: {
        n: email
      },
      method: 'post',
      success:function( res ){
        console.log( res );
      }
    })
  }
})