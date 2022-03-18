
module.exports = class ControllerBase {
    
    constructor(requestId, eventId, logger){
        this.requestId = requestId;
        this.eventId = eventId;
        this.logger = logger;
    }

}