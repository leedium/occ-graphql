const constants = require('../../constants');

exports.SuccessResponse = function (content, statusCode = constants.HTTP_STATUS_SUCCESS, headers = constants.RESPONSE_HEADER_JSON) {
  return {
    content,
    statusCode,
    headers
  };
};

exports.ErrorResponse = function (err, content = '', headers = constants.RESPONSE_HEADER_JSON, status = constants.HTTP_STATUS_FAIL) {
  if (typeof err.status === 'undefined' && !status) {
    status = constants.HTTP_STATUS_FAIL;
  }
  return {
    content,
    status,
    headers
  };
};
