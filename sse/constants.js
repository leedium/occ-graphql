/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-graphql
 * @file constants.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description constants
 **/
module.exports = {
  SSE_NAME: 'occgraphql',
  SSE_VERSION: '1',
  TEST_FOLDER: 'tests',
  NODE_EXTENSION_SERVER_PORT: 11372,
  NODE_EXTENSION_TEST_PORT: 3099,
  ROUTE_BASE: '/v1/occgraphql',
  //
  HTTP_METHOD_GET: 'GET',
  HTTP_METHOD_POST: 'POST',
  HTTP_METHOD_PUT: 'PUT',
  HTTP_METHOD_DELETE: 'DELETE',
  HTTP_METHOD_OPTIONS: 'OPTIONS',
  HTTP_STATUS_SUCCESS: 200,
  HTTP_STATUS_MULTIPLE_CHOICES: 300,
  HTTP_STATUS_BAD_DATA: 400,
  HTTP_STATUS_UNAUTHORIZED_ACCESS: 401,
  HTTP_STATUS_NOT_FOUND: 404,
  HTTP_STATUS_UNPROCESABLE_ENTITY: 422,
  HTTP_STATUS_FAIL: 500,
  HTTP_STATUS_NOT_IMPLEMENTED: 501,

  RESPONSE_HEADER_JSON: {
    'Content-Type': 'application/json'
  },

  RESPONSE_HEADER_XFRAME_TEXT_HTML: {
    'X-Frame-Options': 'sameorigin',
    'Content-Type': 'text/html; charset=utf-8'
  },
  //
  CONTENT_TYPE_APPLICATION_JSON: 'application/json',
  CONTENT_TYPE_APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  //
  NODE_ENV_DEVELOPMENT: 'development',
  NODE_ENV_TEST: 'test',
  //
  GRAPHQL_SECURE: '/secure',
  //
  OCC_ENV_PREVIEW: 'preview',
  //
  SWAPI_HOST: 'swapi.co',
  EXTERNAL_RREQUEST_1_PATH: '/api/planets/1/'
};
