/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-graphql
 * @file serviceExternalRequestTransformer.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 31/07/2018
 * @description Class providing transformation of responses back to OCC
 **/
const SuccessResponse = require('../dataTypes/responseType').SuccessResponse;

class ServiceExternalRequestTransformer {
  /**
   * Transform intellisense
   * @returns {Promise<any>}
   */
  static transformPlanetData (responseObj) {
    //  do whatever tansformations you need to do here, 'don't do anything
    return SuccessResponse(responseObj.body);
  }
}

module.exports = ServiceExternalRequestTransformer;
