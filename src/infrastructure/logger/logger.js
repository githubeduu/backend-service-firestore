

const { createLogger, format, transports } = require('winston');
const path = require('path')
const { combine, timestamp, json } = format;

const httpContext = require('express-http-context');
const { resolve } = require('path');
const logFormat = format.printf(debug => `${debug.timestamp} ${debug.level} [${debug.label}]: ${debug.message}`)

const logger = createLogger({
    level: 'debug',
    format: combine(
      timestamp(),
      json(),
      format.splat()
    ),
    transports: Object.assign(
      new transports.Console({
        handleExceptions: true,
      }),
      {
        handleRejections: true,
      },
    ),
    exceptionHandlers: Object.assign(
      new transports.Console({
          handleExceptions : true
      })
    ),
    rejectionHandlers: [
      new transports.Console({
          handleRejections : true
      })
    ]
  });

  logger.exceptions.handle(
    new transports.Console()
  );

  logger.exitOnError = false;

  logger.stream = {
    write: function(message, encoding){
        logger.debug(`${message}, RequestId: ${httpContext.get('request-id')}, EventId: ${httpContext.get('event-id')}`);
    }
};

module.exports = logger;