
/** Agregar todas las rutas get, post, etc de la aplicación. */

const app = require('./app-config');
const routerFunctions = require('./router-functions');

// ---- Simples Renders----

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

// SECTION Registro de usuario.
app.post('/register-form', routerFunctions.registerUser );

module.exports = app;