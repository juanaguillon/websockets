/** En este archivo se agregaran todas las configuraciones iniciales de la aplicacion */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './public/templates');
app.set('view engine', 'pug')



module.exports = app;