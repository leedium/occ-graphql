/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-sse-starter
 * @file helpers.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description File with helper methods.
 **/

const fs = require('fs');
const path = require('path');
const nconf = require('nconf');
const url = require('url');

const constants = require('../constants');
const config = require('../config.json');

/**
 * Reads a JSON file fomr the file system at a given path
 * @param path
 * @returns {string}
 */
function readJSONFile (filePath) {
  let file = fs.readFileSync(path.join(__dirname, filePath)).toString().replace(/\r?\n|\r/g, '');
  return JSON.parse(file);
}

/**
 * Returns the admin host
 * @returns {string}
 */
function getOCCAdminHostName () {
  return (global.ssePreviewMode ? url.parse(config.occAdminUrl).hostname : url.parse(nconf.stores.runtime.store['atg.server.admin.url']).hostname);
}

/**
 * Method returns the correct host based on the header 'env' value
 * @param req
 * @returns {string}
 */
function getOCCHostName (req) {
  if (global.ssePreviewMode) {
    return req.headers['env'] === constants.OCC_ENV_PREVIEW ? url.parse(config.occAdminUrl).hostname : url.parse(config.occStoreUrl).hostname;
  } else {
    return req.headers['env'] === constants.OCC_ENV_PREVIEW ? url.parse(nconf.stores.runtime.store['atg.server.admin.url']).hostname : url.parse(nconf.stores.runtime.store['atg.server.url']).hostname;
  }
}

/**
 * Method retuns a specific defined host based on header value
 * @param req
 * @returns {*}
 */
function getHostName (req) {
  if (global.ssePreviewMode) {
    return config.devHost;
  } else {
    return req.headers['env'] === constants.OCC_ENV_PREVIEW ? config.devHost : config.prodHost;
  }
}

/**
 * Returns a definedd prop from an array
 * @param array
 * @param key
 * @returns {number | * | BigInt | T}
 */
function getDynamicProperty (array, key) {
  return array.find(item => (item.id === key));
}

module.exports = {
  readJSONFile,
  getOCCHostName,
  getHostName,
  getDynamicProperty,
  getOCCAdminHostName
};
