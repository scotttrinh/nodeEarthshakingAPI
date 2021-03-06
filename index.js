var http = require("http");
var eshake = require("./lib/earthshaking");

var port = 3000;

http.createServer(function (request, response) {
  eshake.orders.get('',{"params":{"limit":"50","complete":"false"}},
                    function(res) {
                      body = JSON.stringify(res);
                      response.setHeader("Access-Control-Allow-Origin","*");
                      response.writeHead(200, { "Content-Type":"application/json" });
                      response.write(body);
                      response.end();
                    });
}).listen(port);
console.log("Server running on port " + port);
