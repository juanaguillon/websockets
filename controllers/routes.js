
/** Agregar todas las rutas get, post, etc de la aplicación. */

const app = require('./app-config');
const routerFunctions = require('./router-functions');

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
// !SECTION

// ----- SECTION Peticiones get Simples

app.get('/session-destroy',( req, res )=> {
  req.session.destroy();
  res.redirect('/login');
})

// !SECTION

// SECTION Registro de usuario.
app.post('/register-form', routerFunctions.registerUser );
// SECTION Login de usuario
app.post('/login', routerFunctions.loginUser );

module.exports = app;