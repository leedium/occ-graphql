/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-sse-starter
 * @file service1Api.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 31/07/2018
 * @description interface for all the homchoice utility sse enpoints
 **/

const SuccessResponse = require('../dataTypes/responseType').SuccessResponse;

class ServiceBasic {
  static graphql (req) {
    return new Promise((resolve) => {
      resolve(SuccessResponse({message: `hello ${req.body.name}`}));
    });
  }
}

module.exports = ServiceBasic;
