module.exports = function (databaseConfig) {
    const express = require('express');
    const router = express.Router();
    const TABLE = 'juegos';
    const general = require('../utils/general')();
    general.setDefaultDatabase('firestore');
    let model = general.getDatabaseModel();
    console.log('Juegos conectado')
    //Lista todos los juegos
    router.get('/', function (request, response) {
        model.getAll(TABLE)
        .then((rows)=>{
            response.send(rows);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //Trae un juego por ID
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

    //Crea un juego
    router.post('/', function (request, response) {        
        model.create(TABLE, request.body)
        .then((object)=>{
            response.send(object)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //Edita un juego
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
    
    //Elimina un juego
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
}