/** En este archivo se agregaran todas las configuraciones iniciales de la aplicacion */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const upload = require('express-fileupload');


app.use(express.static('public'));
app.use( upload() );
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secretcode1902', resave: false, saveUninitialized: false, cookie: { secure: false }}))

app.set('views', './public/templates');
app.set('view engine', 'pug')



module.exports = app;