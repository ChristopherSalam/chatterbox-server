
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var messages = [];

var requestHandler = function(request, response) {


  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  var responseData;

  headers['Content-Type'] = "text/plain";

  if (request.method === "GET") {
   if (request.url === "/classes/messages"){
      sendEnd(response, 200, JSON.stringify({results:messages}), headers);
    } else if (request.url === '/classes/room1') {
      sendEnd(response, 200, JSON.stringify({results:messages}), headers);
    } else {
      sendEnd(response, 404, "File 404, File not found", headers)
    }
  } else if (request.method === "POST") {
    if (request.url === "/classes/messages") {
      request.on('data', function(chunks) {
        messages.push(JSON.parse(chunks));
      });
      request.on('end', function(){
        sendEnd(response, 201, "ok", headers);
      });
   } else if (request.url === '/classes/room1') {
      request.on('data', function(chunks) {
        messages.push(JSON.parse(chunks));
      });
      request.on('end', function(){
        sendEnd(response, 201, "ok", headers);
      });
   }
  }
}

var sendEnd = function(response, statusCode, responseData, headers) {
  response.writeHead(statusCode, headers);
  response.end(responseData);
};

exports.requestHandler = requestHandler;
// var headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
//   "access-control-max-age": 10, // Seconds.
//   "Content-Type": "application/json"
// };

// var objectId = 1;

// var collectData = function (response, callback) {
//     var fullBody = '';
//     request.on('data', function (chunk) {
//       fullBody += chunk;
//     });
//     request.on('end',  function () {
//       callback(JSON.parse(fullBody));
//     });
//   }

// exports.send = function(response, data, statusCode) {
//   statusCode = statusCode || 200
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(data));
// }

// var messages = [
//  {
//   text: 'sup',
//   username: 'fred',
//   objectId: objectId
//  }
// ]; //results: messages

// module.exports = function(request, response) {

//   var responseData = null;
//   var statusCode = null;
//   var fullBody = '';
//   var hasRequestMethod = false;

//   if (request.method === "GET") {

//     exports.send(response, {results: messages});

//   } else if (request.method === "POST") {

//     collectData(response, function(message) {
//       message.objectId = ++objectId;
//       messages.push(message);
//       exports.send(response, {objectId: objectId}, 201)
//     });

//     console.log('messages after', messages);

//   } else if (request.method === "OPTIONS") {
//       exports.send(response, null);
//   } else {
//     exports.send(response, '', 404);
//   }

// };