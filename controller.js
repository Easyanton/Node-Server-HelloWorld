module.exports = function (req, res)
{
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.write("Hello from server, in a new file...");
    res.end();
}
