//console.log("Hello from log");

const http = require("http");
const controller = require("./controller");

const server = http.createServer(controller);

server.listen(8000, function ()
{
    console.log("Server started, go to http://localhost:8000");
});