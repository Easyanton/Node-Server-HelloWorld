const { send, getParams } = require("../helpers");
const db = require("../Database/context");

module.exports =
{
    ID: 7,
    GET:
    {
        handler: function (req, res, id)
        {
            if (id == '')
            {
                send(req, res, { says: "Will get all devices", method: req.method });
            }
            else    
            {
                send(req, res, { says: "This will find divese by id", method: req.method });
            }

        }
    },
    POST:
    {
        handler: function (req, res)
        {
            getParams(req)
                .then(function (params)
                {
                    db.insertDataToCollection("device", params)
                        .then(function (result)
                        {
                            console.log("GOT HERE:::");
                            send(req, res, result);

                        })
                        .catch(function (result)
                        {
                            console.log("GOT HERE...");
                            send(req, res, result);

                        })
                    console.log("HEre");
                })
                .catch(function (err)
                {
                    console.log("Also here");
                    console.log(err);
                    send(req, res, err, 500)
                });
        }
    }
}