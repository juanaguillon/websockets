
/**
 * Este archivo se usará para escuchar las emisiones que se crean en el servidor. EJ: Este archivo, será usado en los productos, para escuchar cada vez que se crea un nuevo producto.
 *
 * Para revisar las emisiones del servidor, puede revisar el archivo controllers/router-sockets.js
 *
 * Para revisar las emisiones del cliente, revise el archivo ./custom.js
 */

/** La variable 'socket', está definida en el archivo custom.js.
 * Se hizo de esta manera para no crear multiples instancias de socketIO.
 */
socket.on('show_products', function (data) {

  var productsContainer = document.createElement('div');
  productsContainer.classList.add('is-tablet')
  productsContainer.classList.add('columns')
  productsContainer.classList.add('products_container')
  productsContainer.classList.add('is-multiline')

  
  for(var i = 0; i < data.length; i++){
    
    var column = document.createElement('div');
    column.classList.add('is-3')
    column.classList.add('column')


    var productsDiv = document.createElement('div');
    var productInner = document.createElement('div');
    var apl = document.createElement('a');
    var img = document.createElement('img');
    var h2 = document.createElement('h2');
    var span = document.createElement('span');

    apl.href = 'product/' + data[i]["id_prod"]
    img.src = "images/" + data[i]['image_prod']

    productsDiv.className = 'products';
    productInner.className = 'product_inner';

    apl.className = 'product_inner_link';

    h2.classList.add("has-text-black")
    h2.classList.add("is-size-5") 
    h2.classList.add("has-text-centered") 

    span.classList.add("has-text-grey-dark");
    span.classList.add("has-text-weight-semibold");
    span.classList.add("is-size-5");

    h2.appendChild(document.createTextNode(data[i]['name_prod']) );

    var price = accounting.formatMoney(data[i]['price_prod'],{
      symbol: '$',
      precision: 0,
      thousand: "."
    });

    span.appendChild(document.createTextNode(price));

    apl.appendChild( img );
    apl.appendChild( h2 );
    apl.appendChild( span );
    productInner.appendChild( apl );
    productsDiv.appendChild( productInner );
    column.appendChild( productsDiv );

    productsContainer.appendChild(column)

  }

  $('.container').html(productsContainer);


});