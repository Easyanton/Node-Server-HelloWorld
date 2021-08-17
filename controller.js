const helpers = require("./helpers");
const logger = require("./logger");
const api = {};

api["/api/duck"] = require("./api/duck");
api["/api/horse"] = require("./api/horse");
api["/api/device"] = require("./api/device");

module.exports = function (req, res)
{
    logger(req, res);

    // URL manipulation. (Get endpoint)
    //const url = req.url;
    const endpoint = new URL(req.url, "http://localhost:8000").pathname;
    //helpers.send(req, res, endpoint);

    // Static file check.
    const reqEx = /^\/((css|img|js)\/)?[\w-]+\.(html|css|png|jpe?g|js|gif|tiff|svg|bmp)$/i;
    let result = endpoint.match(reqEx);

    if (result)
    {
        helpers.streamFile(req, res, "./static/" + result[0]);
        console.log(result);
        return;
    }


    // Api check.    
    const apiRX = /(?<ep>^\/api\/\w+)(?<id>\/?[a-z,0-9]*?)$/i;
    result = endpoint.match(apiRX);

    if (result)
    {
        console.log(result.groups.ep);
        // Api check        
        if (api[result.groups.ep])
        {
            // Method check (ex get)            
            if (api[result.groups.ep][req.method])
            {

                console.log(result);

                // Param check
                if (result.groups.id == '')
                {
                    api[result.groups.ep][req.method].handler(req, res);
                    return;
                }

                if (result.groups.id.substr(1) == api[result.groups.ep]["ID"])
                {
                    api[result.groups.ep][req.method].handler(req, res);
                    return;
                }

                helpers.send(req, res, { msg: "Api Pram ERROR" }, 405);
                return;
            }

            helpers.send(req, res, { msg: "Api mothod not found" }, 405);
        }

        helpers.send(req, res, { msg: "Api not found" }, 405);
        console.log(result);
        return;
    }

    // if (endpoint === "/index.html")
    // {
    //     helpers.sendFile(req, res, "./static/index.html");
    //     return;
    // }

    helpers.send(req, res, { message: `Ressourse out of scope'${endpoint}' not awailable` }, 404);

    //Startup via function
    //helpers.send(req, res, { Message: "Here is the Json message" });

    // Startup.
    // res.statusCode = 200;
    // res.setHeader("Content-type", "text/plain");
    // res.write("Hello from server, in a new file...");
    // res.end();
}

