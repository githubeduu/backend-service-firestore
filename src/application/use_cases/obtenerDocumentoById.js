
module.exports = async (idDocumento, firestoreRepository) => {

    return await firestoreRepository.obtenerDocumentoById(idDocumento);
}