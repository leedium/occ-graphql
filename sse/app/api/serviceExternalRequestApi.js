/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-sse-starter
 * @file serviceExternalRequestApi.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 31/07/2018
 * @description interface for all service enpoints
 **/

const constants = require('../../constants');
const apiRequest = require('../../core/apiRequest');
const transformer = require('./serviceExternalRequestTransformer');

class ServiceExternalRequestApi {
  static getPlanet (req, logger) {
    let httpRequest = {
      path: constants.EXTERNAL_RREQUEST_1_PATH,
      hostname: constants.SWAPI_HOST,
      port: null,
      headers: {
        'Content-Type': constants.CONTENT_TYPE_APPLICATION_JSON
      },
      method: constants.HTTP_METHOD_GET
    };
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiRequest(httpRequest, req.body, logger);
        resolve(transformer.transformPlanetData(response));
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = ServiceExternalRequestApi;
