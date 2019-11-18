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
 * @dateCreated 19/10/2018
 * @description index file to manage the state of the SSE.  Either for "test" mode
 *              live.  Test mode will not run the winston logger
**/

'use strict';
const http = require('http');
const constants = require('./constants');

// stand-alone index.js
const winston = require('winston');
global.testMode = false;
global.ssePreviewMode = false;
global.logging = winston.createLogger({
  levels: {
    error: 0,
    warning: 1,
    info: 2,
    debug: 3
  },
  silent: process.env.NODE_ENV === 'test',
  transports: [
    new winston.transports.Console(
      {level: 'debug', colorize: true}
    )
  ]
});

let app = require('./app/index');

// Local Server created only for development mode
if (process.env.NODE_ENV === 'development' && global.logging) {
  app.server = http.createServer(app);
  app.server.listen(constants.NODE_EXTENSION_SERVER_PORT, err => {
    if (err) {
      global.logging.error(err);
    }
    global.logging.info(`=== ${constants.SSE_NAME} SSE ===`);
    global.logging.info(`Development Mode running on port: ${constants.NODE_EXTENSION_SERVER_PORT}`);
  });
}

module.exports = app;
