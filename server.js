
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const http = require("http");
const controller = require("./controller");
const db = require("./Database/context");

const server = http.createServer(controller);

server.listen(8000, function ()
{
    // This function creates the database and the device collection.
    db.createDB();        

    console.log("Server started, go to http://localhost:8000");
});