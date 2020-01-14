/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/* eslint no-new: 0 */

/**
 * @project occ-graphql
 * @file routeMap.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description Returns and array of route objects with mappings to their
 *              controllers.
 **/

const cors = require('cors');
const nconf = require('nconf');

const Route = require('./route');
const constants = require('../../constants');
const serviceBasic = require('../api/serviceBasic');
// const serviceExternalRequestApi = require('../api/serviceExternalRequestApi');

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: constants.HTTP_RESPONSE_SUCCESS,
  preflightContinue: true,
  allowedHeaders: [
    'Accept',
    'Accept-Encoding',
    'Authorization',
    'Cache-Control',
    'Connection',
    'Content-Length',
    'Content-Type',
    'Cookie',
    'env',
    'Host',
    'Origin',
    'Pragma',
    'Referer',
    'User-Agent',
    'X-Requested-With'
  ]
};

let routeMap = function (router) {
  router.options('/*', cors(corsOptions));

  router.get('/version', cors(corsOptions), (req, res) => {
    const {logger} = res.locals;
    logger.debug(`#######################${process.env['hc_hostUrl']}###########################`);
    res.status(constants.HTTP_STATUS_SUCCESS).json({
      'version': `${constants.SSE_NAME}`,
      'node_version': process.version,
      'nconf': nconf,
      'headers': req.headers,
      'process': process.env['testVar1']
    });
  });

  router.get('/authenticatedUrl', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(constants.HTTP_STATUS_SUCCESS).json({
      'message': 'ok'
    });
  });

  router.post('/test', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(constants.HTTP_STATUS_SUCCESS).json({});
  });
  router.post('/test500', (req, res) => {
    res.status(constants.HTTP_STATUS_FAIL).send();
  });
  new Route({
    router,
    method: constants.HTTP_METHOD_POST,
    route: constants.GRAPHQL_SECURE,
    api: serviceBasic.graphql
  });
  // new Route({
  //   router,
  //   method: constants.HTTP_METHOD_POST,
  //   route: constants.SAY_HELLO,
  //   api: serviceBasic.sayHello,
  //   testReq: 'serviceBasic-test-req.json',
  //   testRes: 'serviceBasic-test-res.json'
  // });
  // new Route({
  //   router,
  //   method: constants.HTTP_METHOD_POST,
  //   route: constants.GET_PLANETS,
  //   api: serviceExternalRequestApi.getPlanet,
  //   testReq: 'test2-req.json',
  //   testRes: 'test2-res.json'
  // });

  return router;
};
module.exports = routeMap;
