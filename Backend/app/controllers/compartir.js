const { resolveContent } = require('nodemailer/lib/shared');

module.exports = function (databaseConfig) {
    const express = require('express');
    const router = express.Router();
    const TABLE = 'compartir';
    const general = require('../utils/general')();
    general.setDefaultDatabase('firestore');
    let model = general.getDatabaseModel();
    console.log('Compartir conectado')
    //Lista todos los compartir
    router.get('/', function (request, response) {
        model.getAll(TABLE)
        .then((rows)=>{
            response.send(rows);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //Trae un usuario por ID
    router.get('/:id', function (request, response) {
        let id = request.params.id;
        model.getById(TABLE, id)
        .then((row)=>{
            response.send(row);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //Crea un usuario
    router.post('/', function (request, response) {        
        model.create(TABLE, request.body)
        .then((object)=>{
            response.send(object)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //Edita un usuario
    router.put('/:id', function (request, response) {        
        let id = request.params.id;
        model.update(TABLE, request.body, id)
        .then((row)=>{
            response.send(row);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });

    });
    
    //Elimina un usuario
    router.delete('/:id', function (request, response) {
        let id = request.params.id;        
        model.delete(TABLE, id)
        .then((message)=>{
            response.send(message);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });


    //Limpiar tabla
    router.get('/option/clean', function (request, response) {
        model.clean(TABLE)
        .then((message)=>{
            response.send(message)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    router.post('/option/initialize', function (request, response) {
        model.initialize(TABLE, request.body)
        .then((message)=>{
            response.send(message)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });    

    return router;



                 //Nodemailer Envio de Correos
    exports.SendEmail = functions.https.onRequest((request, response)=>{

        const nodemailer = require("nodemailer");

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'cgamesapp1@gmail.com', // generated ethereal user
              pass: 'app12345', // generated ethereal password
            },
          });

          let emailOptions = {
              from: '"Todo Sobre Video Juegos 👻" <cgamesapp1@gmail.com>',
              to: 'cristhianmoreno9310@gmail.com',
              subject: 'Mwensaje de Prueba',
              text: 'Tu Juego Se Ha Guardado Correctamente',
              html:'<b>Tu Juego Se Ha Guardado Correctamente</b>'
          };
          return transporter.sendMail(emailOptions).then((data)=>{
            response.send('Correo Enviado');
            resolve(data);
          }).catch((error)=>{
            response.send(error);
            reject(error);
          });
    });


}