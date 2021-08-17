const { send } = require("../helpers");

module.exports =
{
    ID: 7,
    GET:
    {
        handler: function (req, res)
        {
            send(req, res, { says: "Device 2", method: req.method });
        }
    },
    POST:
    {
        handler: function (req, res)
        {
            send(req, res, { says: "Device 2", method: req.method });
        }
    }

}