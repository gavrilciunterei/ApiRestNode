var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos de rutas
var project_routes = require('./routes/project');

//middkwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //convierte los dartos a json

//cors

//rutas
app.use('/', project_routes);
//exportar
module.exports = app;
