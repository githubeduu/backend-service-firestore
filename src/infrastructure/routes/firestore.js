
const express = require('express');
const ControllerFactory = require('../factory/controller-factory');
const router = express.Router();
const ExceptionResponse = require('../models/exceptionResponse');

router.get('/:idDocumento', async (req, res) => {

    const result = await ControllerFactory.createObject("firestore-controller").ObtenerDocumentoById(req.params.idDocumento).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json(error);
        // res.status(500).json({
        //     message: "Ha ocurrido un error para mayor información contacte al administrador",
        //     details : error.message,
        //     requestId: req.headers["request-id"]
        // });
        console.log(error);
    });
});

router.post('/', async (req, res) => {

    const result = await ControllerFactory.createObject("firestore-controller").AgregarDocumento(req.body).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json();
        console.log(error);
    });
});

router.get('/', async (req, res) => {

    const result = await ControllerFactory.createObject("firestore-controller").ObtenerColeccion().then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json(error);
        // res.status(500).json({
        //     message: "Ha ocurrido un error para mayor información contacte al administrador",
        //     details : error.message,
        //     requestId: req.headers["request-id"]
        // });
        console.log(error);
    });
});

module.exports = router;