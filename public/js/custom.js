$('.navbar-burger').click( function( ){
  $(".navbar-burger").toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
})

$('#navbarBasicExample .has-dropdown').click(function( ){
  $(this).toggleClass('is-active');
})