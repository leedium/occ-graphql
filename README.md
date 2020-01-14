# occ-graphql
GraphQL / Graphiql implementation for Oracle Commerce Cloud

# [occ-graphql](https://github.com/leedium/occ-graphql "Express GraphQL implementation")

This application makes it easy to create and deploy [Express GraphQL](https://graphql.org/graphql-js/running-an-express-graphql-server/) [Server Side Extensions](https://docs.oracle.com/cd/E97801_01/Cloud.18C/ExtendingCC/html/s4303developserversideextensions01.html "Server Side Extensions in OCC") in [Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud")
### version 1.1.0

- [Node](https://nodejs.org/ "Node JS")
- [Express](https://expressjs.com/ "Express js").
- [graphql](https://www.npmjs.com/package/graphql "graphql").
- [express-graphql](https://www.npmjs.com/package/express-graphql "express-graphql").
- [eslint](https://eslint.org/ "Eslint")
- [Mocha](https://mochajs.org/ "Mocha")
- [Expect js](https://github.com/Automattic/expect.js/ "Expect")

## CORS
Add white listed Card Provider endpoints via OCC API to allow [CORS](http://docs.oracle.com/cd/E83821_01/Cloud.17-1/ExtendingCC/html/s0204corssupport01.html
 "Oracle Cors") support

```
{
    "properties": {
        "allowedOriginMethods": {
            "https://{your origin}": "POST",
            "https://{your origin}": "POST"
         }
    }
}
```

## Routes

#### Sample Routes

## Secure endpoints

For access to external resources from SSE, copy all X509 PEM Certificates(.pem | .crt) files to the following folder
``
/ssl
``
* you can use chrome or firefox to export these directly from the browser


## Configuration  config.json

1.Rename config.rename.json to config.json and update the configuration values

```
{
  "occDeployServer": "{OCC ADMIN URL}"
}
```

2.Update the SSE_NAME and ROUTE_BASE properties in constants.js
```
  SSE_NAME: '{NAME}',
  ...
  ROUTE_BASE: '/v1/{NAME',
```

3.Update package json package:zip script
// todo:  make this dynamic
```
"package:zip": "bestzip {NAME}-sse.zip ./*",

```


## Installation

Install all dependencies required by module

```
$ npm i
```

## Tests

To run tests:
Running tests allows you to test the static and live json schema
without having to use postman.  The test state will only ever run when the sse is executed locally.
Files located in /tests

```
$ TOKEN={API_TOKEN} npm run test
```


## Deployment Steps

1 . Packages and deploys to your [OCC](https://docs.oracle.com/en/cloud/saas/commerce-cloud/index.html "Oracle Commer Cloud Portal") instance.
Host and api key must be configured in config.js and constants.js

```
$ TOKEN={API_TOKEN} npm run deploy

```
#### * The deploy will not complete unless both the tests and linter pass.


## Local dev server

```
$ TOKEN={API_TOKEN} npm run start-dev
```

Starts up a local server to test for remote access by other clients.
Local Development Routes

GET http://localhost:11372/v1/h{SSE_NAME}/version


## Validate SSE is runnning

Open the SSE specific url in the browser  {OCC Instance}/ccstorex/custom/v1/{SSE_NAME}/version

```javascript
// Response:
{
    "version": "starter version: 1",
    "node_version": "v8.11.1"
}
```
#### Use [occ-route-tester](https://github.com/leedium/occ-widgets/tree/master/widgets/sseRouteTester "Occ Route Tester") to test the endpoints in real-time in the occ preview-admin or storefront.
```
//example for occ-sse-tester
method: POST
path: starter/serviceexternal/getPlanet
JSON: {"planetId":"1"}
```


## Generate an Auth token for postman
```
$ npm run token
```


## Requesting SSE fom client side
Please add the following to the header requests:

```
//  Insecure Endpoint
headers:{
    'env': 'preview',  //Boolean indicating mode ex:  [ 'preview' | 'storefront' ]
    'hc-page': widget.pageContext().page.name, // name of the page requesting resource ex: ['home']
    'Content-Type': 'application/json' // Content Type of the payload
}

//  Secure Endpoint
//  ...same as above but add users authenticated occ token

    'Authorization': 'Bearer ' + ccRestClient.tokenSecret


// Example request from JS using Jquery Ajax
$.ajax({
    method: 'POST',
    dataType: 'json',
    url: '/ccstorex/custom/v1/{SSE_NAME}/{YOUR_ENDPOINT}',
    withCredentials: true,
    data: JSON.stringify({somePayload:'some payloadd'}),
    headers: {
        'Authorization': 'Bearer ' + ccRestClient.tokenSecret,
        'env': 'preview'
        'hc-page': widget.pageContext().page.name,
        'Content-Type': 'application/json'
    }
})
.done(function (res) {})
.fail(function (err) {});

```

<br/><br/><br/>
### Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
