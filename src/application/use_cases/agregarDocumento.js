
module.exports = async (doc, firestoreRepository) => {

    return await firestoreRepository.agregarDocumento(doc);
}