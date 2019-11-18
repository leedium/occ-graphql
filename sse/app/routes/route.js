/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * Route.js
 * Abstract Class for SSE Routes
 * @type {*|createApplication}
 */
/**
 * @project occ-sse-starter
 * @file route.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description Base Class for a route.
 *              Extend this to add more features or functionality.
 **/

const constants = require('../../constants');
const config = require('../../config.json');
const helpers = require('../../core/helpers');

class Route {
  constructor (options) {
    this.router = options.router;
    this.api = options.api;
    const responseHandler = (req, res, next) => {
      let logger = res.locals.logger;
      /**
       * Handles the 'transformed' response and send it back to client
       * @param result
       */
      let handleResult = ({statusCode, headers, content}) => {
        logger.debug(`#SSE:RESPONSE::${statusCode}#`);
        res.set(headers).status(statusCode).json(content);
      };
      /**
       * Conducts a request to the LIVE endpoint
       */
      let apiCheck = () => {
        this.api(req, logger)
          .then(handleResult)
          .catch(err => {
            logger.debug(`#SSE:RESPONSE::${err.message}#`);
            res.status(err.statusCode).json(err);
          });
      };
      /**
       * Conditional check to see if SSE is running in dev|test|production mode
       * If running locally for development or testing this route will respond with test
       * JSON data specific to the route.
       */
      try {
        if (process.env.NODE_ENV === constants.NODE_ENV_DEVELOPMENT || process.env.NODE_ENV === constants.NODE_ENV_TEST) {
          if (global.testMode) {
            let body = helpers.readJSONFile(`../${config.testFolder}/json/${options.testRes}`);
            handleResult({
              statusCode: constants.HTTP_STATUS_SUCCESS,
              body
            });
          } else {
            apiCheck();
          }
        } else {
          apiCheck();
        }
      } catch (err) {
        next(err);
      }
    };

    switch (options.method) {
      case constants.HTTP_METHOD_GET:
        this.router.get(`${options.route}`, responseHandler);
        break;
      case constants.HTTP_METHOD_POST:
        this.router.post(`${options.route}`, responseHandler);
        break;
      case constants.HTTP_METHOD_PUT:
        this.router.put(`${options.route}`, responseHandler);
        break;
      case constants.HTTP_METHOD_DELETE:
        this.router.delete(`${options.route}`, responseHandler);
        break;
    }
    return this.router;
  };
}
module.exports = Route;
