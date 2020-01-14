/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-graphql
 * @file apiRequest.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 31/07/2018
 * @description central point to make external requests to third parties
 **/

const querystring = require('querystring');

const constants = require('../constants');

/**
 * Central http request interface for all outbound calls from SSE
 * @param httpRequest
 * @param data
 * @param logger
 * @param secure - whether to use https or http, defaults to true
 * @returns {Promise<any>}
 */
function apiRequest (httpRequest, data, logger, secure = true) {
  return new Promise((resolve, reject) => {
    const request = secure ? global.httpsRequest : global.httpRequest;
    if (typeof global.agent !== 'undefined') {
      httpRequest['agent'] = global.agent;
    }
    let response = '';
    logger.debug(`#HC_SSE:REQUEST:START::${httpRequest.hostname}${httpRequest.path}#`);
    let req = request.request(httpRequest, res => {
      res.on('data', chunk => {
        response += chunk;
      });
      res.on('end', () => {
        try {
          if (res.statusCode === constants.HTTP_STATUS_SUCCESS) {
            logger.debug(`#HC_SSE:REQUEST:SUCCESS::${httpRequest.path}:HTTP response: ${res.statusCode}#`);
            if (httpRequest.headers['Content-Type'] === constants.CONTENT_TYPE_APPLICATION_JSON ||
              httpRequest.headers['content-type'] === constants.CONTENT_TYPE_APPLICATION_JSON) {
              response = JSON.parse(response);
            }
            resolve({
              statusCode: res.statusCode,
              body: response
            });
          } else {
            const err = new Error(`#HC_SSE:ERROR::${httpRequest.path}:HTTP response: ${res.statusCode}#`);
            err.statusCode = res.statusCode;
            logger.error(err.message);
            reject(err);
          }
        } catch (err) {
          logger.error(`#HC_SSE:ERROR::${httpRequest.path}:HTTP response: ${res.statusCode}#`);
          reject(err);
        }
      });
    });
    req.on('error', err => {
      logger.error(`#HC_SSE:ERROR::${httpRequest.path}:HTTP response: ${err.message}#`);
      reject(err);
    });
    if (httpRequest.headers['Content-Type'] === constants.CONTENT_TYPE_APPLICATION_JSON) {
      req.write(JSON.stringify(data));
    } else if (httpRequest.headers['Content-Type'] === constants.CONTENT_TYPE_APPLICATION_FORM_URLENCODED) {
      req.write(querystring.stringify(data));
    }
    req.end();
  });
}

module.exports = apiRequest;
