var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var objectId = 1;

var collectData = function (response, callback) {
    var fullBody = '';
    request.on('data', function (chunk) {
      fullBody += chunk;
    });
    request.on('end',  function () {
      callback(JSON.parse(fullBody));
    });
  }

exports.send = function(response, data, statusCode) {
  statusCode = statusCode || 200
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
}

var messages = [
 {
  text: 'sup',
  username: 'fred',
  objectId: objectId
 }
]; //results: messages

module.exports = function(request, response) {

  var responseData = null;
  var statusCode = null;
  var fullBody = '';
  var hasRequestMethod = false;

  if (request.method === "GET") {

    exports.send(response, {results: messages});

  } else if (request.method === "POST") {

    collectData(response, function(message) {
      message.objectId = ++objectId;
      messages.push(message);
      exports.send(response, {objectId: objectId}, 201)
    });

    console.log('messages after', messages);

  } else if (request.method === "OPTIONS") {
      exports.send(response, null);
  } else {
    exports.send(response, '', 404);
  }

};