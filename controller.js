const helpers = require("./helpers");

module.exports = function (req, res)
{
    // URL manipulation. (Get endpoint)
    //const url = req.url;
    const endpoint = new URL(req.url, "http://localhost:8000").pathname;
    //helpers.send(req, res, endpoint);

    const reqEx = /^\/((css|img|js)\/)?\w+\.(html|css|png|jpe?g|js|gif|tiff|svg|bmp)$/i;

    let result = endpoint.match(reqEx);

    console.log(result);

    if (result)
    {
        //helpers.sendFile(req, res, "./static/" + result[0]);
        helpers.streamFile(req, res, "./static/" + result[0]);
        return;
    }

    // if (endpoint === "/index.html")
    // {
    //     helpers.sendFile(req, res, "./static/index.html");
    //     return;
    // }

    helpers.send(req, res, { message: `Ressourse '${endpoint}' not awailable` }, 404);

    //Startup via function
    //helpers.send(req, res, { Message: "Here is the Json message" });

    // Startup.
    // res.statusCode = 200;
    // res.setHeader("Content-type", "text/plain");
    // res.write("Hello from server, in a new file...");
    // res.end();
}

