
const ControllerBase = require('../base/controller-base');
const util = require('util');
const logger = require('../logger/logger');

const httpContext = require('express-http-context');

 module.exports = class Interceptor {

    static intercept(objectInstance, method, parameters){

      if(objectInstance instanceof ControllerBase){
         
         objectInstance.logger.debug(`Metodo: ${objectInstance.constructor.name} - ${method}, Parametros: ${util.format(parameters).replace('{', '').replace('}', '')}, RequestId: ${objectInstance.requestId}, EventId: ${objectInstance.eventId}`);
      }
    }

    static interceptResult(result){
      logger.debug(`Result: ${result}, RequestId: ${httpContext.get('request-id')}, EventId: ${httpContext.get('event-id')}`);
    }
 }