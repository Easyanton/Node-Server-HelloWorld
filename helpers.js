
const fs = require("fs");
const minetypes = require("./mimetypes");
const path = require("path");
const mimetypes = require("./mimetypes");

exports.send = function (req, res, msg, status = 200)
{
    res.statusCode = status;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(msg));
}

exports.sendFile = function (req, res, filePath)
{
    const ext = path.extname(filePath);
    const mime = mimetypes[ext];

    fs.readFile(filePath, function (err, Content) 
    {
        if (err)
        {
            exports.send(req, res, err, 404);
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-type", mime);
        res.end(Content);
    });
}

exports.streamFile = function (req, res, filePath)
{
    const ext = path.extname(filePath);
    const mime = mimetypes[ext];
    const stream = fs.createReadStream(filePath);

    stream.on("error", function (err)
    {
        console.log(err);
        exports.send(reg, res, err, 404);
    });

    res.statusCode = 200;
    res.setHeader("Content-type", mime);

    stream.pipe(res);
}

exports.getParams = function (req) {
    return new Promise(function (resolve, reject) {
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            body = JSON.parse(body);
            resolve(body);
        })
        req.on("error", function (err) {
            console.log("Get data ERROR.");
            reject(err);
        })
    })
}

exports.getJSONData = function (req) {
    let body = "";
    return new Promise((resolve, reject) => {
        req.on("data", (chunc) => {
            body += chunc;
        })
        req.on("end", () => {
            body = JSON.parse(body);
            resolve(body);
        })
        req.on("error", err => {
            console.log("Get Json ERROR");
            console.log(err);
            reject(err)
        })
    })
}