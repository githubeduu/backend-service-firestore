
const FirestoreController = require('../controllers/firestoreController');

const httpContext = require('express-http-context');
const logger = require('../logger/logger');
const Interceptor = require('../interceptor/interceptor')

module.exports = class ControllerFactory {

    static createObject(model) {
        switch (model) {
            case "firestore-controller":
                const requestId = httpContext.get('request-id');
                const eventId = httpContext.get('event-id');

                const objectInstance = new FirestoreController(requestId, eventId, logger);

                return new Proxy(objectInstance,
                    {
                        get: function (target, key, receiver) {
                            const propValue = target[key];

                            return async function (...args) {
                                Interceptor.intercept(target, key, arguments[0]);
                                let result = await propValue.apply(this, args);
                                Interceptor.interceptResult(JSON.stringify(result));
                                return result;
                            }
                        }
                    });
        }
    }
}