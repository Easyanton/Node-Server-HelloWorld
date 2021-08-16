console.log("Hello from log");

const http = require("http");

const server = http.createServer(function (req, res)
{
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.write("Hello from server...");
    res.end();
});

server.listen(8000);