
require('dotenv').config();
const {MAIN_PORT} = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const httpContext = require('express-http-context');
const cors = require('cors');
const helmet = require('helmet');

var winston = require('winston'),
expressWinston = require('express-winston');

const firestoreRoutes = require('../src/infrastructure/routes/firestore');

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb'}));
app.use(httpContext.middleware);

app.use(helmet());
app.use(cors());

app.use((req, res, next) =>{
    httpContext.set('request-id', req.header('request-id'));
    httpContext.set('event-id', req.header('event-id'));
    next();
});

app.use('/app', firestoreRoutes);

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.json()
}));

app.listen(MAIN_PORT, () => {
    console.log(`rating api listen on PORT ${MAIN_PORT}`)
});