
const { hrtime } = require("process");

module.exports = function (req, res)
{
    const timeStamp = new Date().toLocaleString();
    let logStr = timeStamp;
    const startTime = hrtime();

    res.on("finish", () =>
    {
        const duration = hrtime(startTime);

        logStr += `
            Method: ${req.method}
            URL: ${req.url}
            Status: ${res.statusCode} ${res.statusMessage}
            Duration: ${duration[0]}s ${duration[1] / 1000000}ms`;
        console.log(logStr);
    });
}