
/** Agregar todas las rutas get, post, etc de la aplicación. */

const app = require('./app-config');

app.get('/', function (req, res) {
  res.render('index')
});
app.get('/login', function (req, res) {
  res.render('login')
});
app.get('/register', function (req, res) {
  res.render('register')
});

app.post('/register-form', function( req, res ){
  console.log( req.body );
  res.send({stat:true});
})

module.exports = app;