//npm install express --save
//npm install body-parser
const express = require('express');
const aplication = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000 ;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1' ;

//Se utiliza el bodyparser
aplication.use(bodyParser.json());
aplication.use(bodyParser.urlencoded({ extended: true}));
//Se utiliza el bodyparser

let usersController = require('./app/controllers/usuarios')();
aplication.use('/usuarios', usersController);

aplication.listen(port,bind, function () {
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('Aplicación : '+ config.app.name);
    console.log('Corriendo en el puerto : '+config.app.port);
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
});
