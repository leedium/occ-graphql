/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-sse-starter
 * @file index.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description main entry file
 **/

const nconf = require('nconf');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const HttpsProxyAgent = require('https-proxy-agent');
const graphqlHTTP = require ('express-graphql');
const {buildSchema} = require('graphql');

const constants = require('../constants');
const routeMap = require('./routes/routeMap');

const proxy = process.env.http_proxy || nconf.get('general:proxy-server');
if (typeof proxy !== 'undefined') {
  global['agent'] = new HttpsProxyAgent(proxy);
}

global.httpRequest = http;
global.httpsRequest = https;

const router = express.Router();
const app = express();

const schema = buildSchema(`type Query {
  hello: String
}`);

const root = {
  hello: () => {
    return 'hello world'
  }
}

app.use('/graphql', graphqlHTTP(
  {
    schema: schema,
    rootValue: root,
    graphiql: true
  }
))

// Cors
let corsOptions = {
  origin: [
    '*'
  ],
  methods: [
    constants.HTTP_METHOD_POST,
    constants.HTTP_METHOD_PUT,
    constants.HTTP_METHOD_OPTIONS,
    constants.HTTP_METHOD_OPTIONS
  ],
  optionsSuccessStatus: constants.HTTP_STATUS_SUCCESS,
  preflightContinue: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

//  define mock logging how it's done on the server with winston
if (global.logging) {
  app.use((req, res, next) => {
    if (!res.locals) {
      res.locals = {};
    }
    res.locals.logger = global.logging;
    next();
  });
}

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
//  Route references
app.use(constants.ROUTE_BASE, routeMap(router));

// add error handling
app.use((error, res, req, next) => {
  res.status(error.statusCode || 500).json(error);
});

module.exports = app;
