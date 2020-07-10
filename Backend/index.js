//npm install express --save
//npm install body-parser
const express = require('express');
const aplication = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const cors = require('cors');
const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000 ;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1' ;

aplication.use(cors());
//Se utiliza el bodyparser
aplication.use(bodyParser.json());
aplication.use(bodyParser.urlencoded({ extended: true}));
//Se utiliza el bodyparser
//Declarando controladores
let usersController = require('./app/controllers/usuarios')();
aplication.use('/usuarios', usersController);
let juegosController = require('./app/controllers/juegos')();
aplication.use('/juegos', juegosController);
let compartirController = require('./app/controllers/compartir')();
aplication.use('/compartir', compartirController);
let noticiasController = require('./app/controllers/noticias')();
aplication.use('/noticias', noticiasController);
let subidosController = require('./app/controllers/subidos')();
aplication.use('/subidos', subidosController);

//Declarando controladores

aplication.listen(port,bind, function () {
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('Aplicación : '+ config.app.name);
    console.log('Corriendo en el puerto : '+config.app.port);
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
});
