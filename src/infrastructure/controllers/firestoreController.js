const AgregarDocumento = require("../../application/use_cases/agregarDocumento");
const ObtenerDocumentoById = require("../../application/use_cases/obtenerDocumentoById");
const ObtenerColeccion = require("../../application/use_cases/obtenerColeccion");
const ControllerBase = require("../base/controller-base");
const FirestoreRepository = require('../repositories/firestoreRepository');



module.exports = class extends ControllerBase {

    constructor(requestId, eventId, logger){
        super(requestId, eventId, logger);
    }

    async ObtenerDocumentoById(idDocumento){

        return await ObtenerDocumentoById(idDocumento, new FirestoreRepository());
    }

    async AgregarDocumento(doc){

        return await AgregarDocumento(doc, new FirestoreRepository());
    }

    async ObtenerColeccion(){

        return await ObtenerColeccion(new FirestoreRepository());
    }
}