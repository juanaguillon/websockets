
/** Agregar todas las rutas get, post, etc de la aplicación. */

const app = require('./app-config');
const routerFunctions = require('./router-functions');
const renderFunctions = require('./router-renders');

// ---- SECTION Simples Renders----

// Renderizar el inicio
app.get('/', function (req, res) {
  res.render('index')
});

// Renderizar el login
app.get('/login', function (req, res) {
  res.render('login')
});

// Renderizar el registro
app.get('/register', function (req, res) {
  res.render('register')
});

// Renderizar el privado
app.get('/private', function (req, res) {
  if ( ! req.session.uid ) {
    res.redirect('/login');
    return;
  }

  // Enviar los datos el usuario actual.
  let privateOptions = {
    name: req.session.name,
    uid: req.session.uid
  }
  res.render('private', privateOptions )
});

// Renderizad todos los productos

app.get('/products', renderFunctions.getAllProducts );

// !SECTION

// ----- SECTION Peticiones get Simples

app.get('/session-destroy',( req, res )=> {
  req.session.destroy();
  res.redirect('/login');
})

// !SECTION


// Registro de usuario.
app.post('/register-form', routerFunctions.registerUser );
// Login de usuario
app.post('/login', routerFunctions.loginUser );
// Crear producto ( Privado )
app.post('/create-product',routerFunctions.createProduct );

module.exports = app;