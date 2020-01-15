/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-graphql
 * @file index.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description main entry file
 **/

const nconf = require('nconf');
const graphqlHTTP = require('express-graphql');
const {buildSchema, GraphQLSchema,GraphQLList, GraphQLObjectType, GraphQLString} = require('graphql');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const HttpsProxyAgent = require('https-proxy-agent');

const constants = require('../constants');
const routeMap = require('./routes/routeMap');

const proxy = process.env.http_proxy || nconf.get('general:proxy-server');
if (typeof proxy !== 'undefined') {
  global['agent'] = new HttpsProxyAgent(proxy);
}

const {GraphQLSchema} = require('graphql');

export default new GraphQLSchema({
  query: QueryType
})

global.httpRequest = http;
global.httpsRequest = https;

const router = express.Router();
const app = express();

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

const schema = buildSchema(`
  type Query {
    myName: String
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

var root = {
  myNAme: () => {
    return 'David Lee';
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

const testMiddleware = (req, res, next) => {
  console.log(res.headers);
  next();
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
app.use(testMiddleware);
app.use(`${constants.ROUTE_BASE}/graph`, graphqlHTTP(
  {
    schema: schema,
    rootValue: root,
    graphiql: true
  }
));

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//  Route references
app.use(constants.ROUTE_BASE, routeMap(router));

// add error handling
app.use((error, res, req, next) => {
  res.status(error.statusCode || 500).json(error);
});

module.exports = app;
