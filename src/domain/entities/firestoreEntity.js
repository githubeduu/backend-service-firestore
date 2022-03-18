
module.exports = class {

    constructor(pedidoId, fechaRespuesta, dispositivoId, usuarioId, respuestas){
        this.pedidoId = pedidoId;
        this.fechaRespuesta = fechaRespuesta;
        this.dispositivoId = dispositivoId;
        this.usuarioId = usuarioId;
        this.respuestas = respuestas;
    }
}