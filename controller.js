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
    const apiRX = /(?<route>^\/api\/\w+)(?<id>\/?[a-z,0-9]*?)$/i;
    result = endpoint.match(apiRX);

    if (result)
    {
        // Api check        
        if (api[result.groups.route])
        {
            // Method check (ex get)            
            if (api[result.groups.route][req.method])
            {

                console.log(result);

                // Param check
                if (result.groups.id == '')
                {
                    api[result.groups.route][req.method].handler(req, res);
                    return;
                }

                if (result.groups.id.substr(1) == api[result.groups.route]["ID"])
                {
                    api[result.groups.route][req.method].handler(req, res);
                    return;
                }

                helpers.send(req, res, { msg: "Api Pram ERROR" }, 404);
                return;
            }

            helpers.send(req, res, { msg: "Api mothod not found" }, 405);
        }

        helpers.send(req, res, { msg: "Api not found" }, 404);
        console.log(result);
        return;
    }

    helpers.send(req, res, { message: `Ressourse out of scope'${endpoint}' not awailable` }, 404);
}

