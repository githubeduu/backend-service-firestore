
const firebase = require('firebase-admin')
require('firebase/firestore');
const { GOOGLE_APPLICATION_CREDENTIALS, GCP_PROJECT_ID } = process.env;

firebase.initializeApp({
    credential: firebase.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
    databaseURL: `https://${GCP_PROJECT_ID}.firebaseio.com`
});

module.exports = class {

    async obtenerDocumentoById(id){
        const db = firebase.firestore();

        return await db.collection('PlantillaEncuesta').doc(id).get().then(snapshot => {
            let result = snapshot.data();

            if(result){
                return result;
            }else{
                throw new Error(`Encuesta id ${id} no encontrada`);
            }
        }).catch((error) => {
            throw error;
        });

    }

    async agregarDocumento(doc){
        doc.fechaRespuesta = firebase.firestore.Timestamp.now();
        const db = firebase.firestore();

        const result = await db.collection('EncuestaUsuarioRating').add(doc);

        return result.id;
    }

    async obtenerColeccion(){
        const db = firebase.firestore();

        return await db.collection('EncuestaUsuarioRatingTest').get().then(res => {
           var result = new Array();
           let guardado = null;
           res.forEach(doc => {              
                result = doc.data();
                guardado = db.collection('EncuestaPruebaEdu').add(result);
           });
         
            if(guardado){
                return guardado;
            }else{
                throw new Error(`Encuestas no encontradas`);
            }
        }).catch((error) => {
            throw error;
        });

    }
}