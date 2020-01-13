/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/* global describe, after it, before */

const http = require('http');
const expect = require('expect.js');
const supertest = require('supertest');

const constants = require('../constants');
const readJSONFile = require('../core/helpers').readJSONFile;

const TEST_TIMEOUT = 30000;

describe('====== Utility Routes ======', function () {
  let app;
  before(function () {
    app = require('../index');
    app.server = http.createServer(app);
    app.server.listen(constants.NODE_EXTENSION_TEST_PORT, function (err) {
      if (err) {
        console.log('SSE_ERROR ');
      }
    });
  });
  after(function () {
    app.server.close();
  });

  /**
   * Test SSE Version is installed and valid.
   */
  it('- Returns a SSE version\n', function (done) {
    supertest(app)
      .get(`${constants.ROUTE_BASE}/version`)
      .set({'env': 'true'})
      .expect(constants.HTTP_STATUS_SUCCESS)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property('version');
        done();
      });
  }).timeout(TEST_TIMEOUT);

  it(`- Returns a valid message \n\t${constants.GRAPHQL_SECURE} \n\t- original search string\n\t- result object\n\t\t-- status\n\t\t-- response\n`, function (done) {
    global.testMode = false;
    let payload = readJSONFile(`../${constants.TEST_FOLDER}/json/serviceBasic-test-req.json`);
    supertest(app)
      .post(`${constants.ROUTE_BASE}${constants.GRAPHQL_SECURE}`)
      .set({'env': 'preview'})
      .send(payload)
      .expect(constants.HTTP_STATUS_SUCCESS)
      .end(function (err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be('hello LEEDIUM');
        done();
      });
  }).timeout(TEST_TIMEOUT);
});
