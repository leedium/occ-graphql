/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/* eslint  no-console: off */
/**
 * @project mygate
 * @file deploy.js
 * @company LEEDIUM
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description
 **/

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const argv = require('yargs').argv;

const constants = require('../constants');
const config = require('../config');

const loginToOCC = () => axios({
  method: 'post',
  url: `${config.occDeployServer}/ccadmin/v1/login`,
  responseType: 'json',
  params: {
    'grant_type': 'client_credentials'
  },
  headers: {
    'Authorization': `Bearer ${argv.token}`,
    'content-type': 'application/x-www-form-urlencoded'
  }
});

function deploySSE () {
  loginToOCC()
    .then(res => {
      console.log('occ login successful\n', res.data.access_token);
      console.log('uploading sse to server...');

      const fileName = `${constants.SSE_NAME}-sse.zip`;
      const filePath = `${path.resolve(__dirname, '../')}/${fileName}`;

      let options = {
        method: 'POST',
        url: `${config.occDeployServer}/ccadmin/v1/serverExtensions`,
        headers:
          {
            connection: 'keep-alive, close',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            authorization: `Bearer ${res.data.access_token}`
          },
        formData:
          {
            filename: fileName,
            uploadType: 'extensions',
            force: 'true',
            fileUpload:
              {
                value: fs.createReadStream(filePath),
                options:
                  {
                    filename: filePath,
                    contentType: null
                  }
              }
          }
      };
      request(options, (error, response, body) => {
        if (error) throw new Error(error);
        if (JSON.parse(body).errorCode) {
          console.log('ERROR:', body);
        } else {
          console.log(`${fileName} deployed successfully.`, body);
        }
      });
    })
    .catch(err => {
      console.log(Error(err));
    });
}

if (argv.token && argv.noDeploy) {
  loginToOCC()
    .then(res => {
      console.log(`\nBearer ${res.data.access_token}`);
    })
    .catch(err => {
      console.log(Error(err));
    });
} else if (argv.token) {
  deploySSE();
} else {
  console.log('please set the api token\nex: --token={YOUR API TOKEN}');
}
