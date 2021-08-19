const { send, getParams } = require("../helpers");
const db = require("../Database/context");

module.exports =
{
    GET:
    {
        handler: function (req, res, id)
        {
            if (id == '')
            {
                db.getAllDevices()
                    .then(function (result)
                    {
                        console.log("Found device by ID");
                        send(req, res, result);
                    });

            }
            else    
            {
                db.getDeviceById(id.substring(1))
                    .then(function (result)
                    {
                        console.log("Found device by ID");
                        send(req, res, result);
                    });

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
                            send(req, res, result);

                        })
                        .catch(function (result)
                        {
                            send(req, res, result);

                        })
                })
                .catch(function (err)
                {
                    console.log(err);
                    send(req, res, err, 500)
                });
        }
    },
    DELETE:
    {
        handler: function (req, res, id)
        {
            if (id == '')
            {
                send(req, res, { says: "No ID", method: 404 });
            }
            else    
            {
                db.deleteDeviceById(id.substring(1))
                    .then(function (result)
                    {
                        send(req, res, result);
                    });

            }

        }
    },
    PUT:
    {
        handler: function (req, res)
        {
            getParams(req)
                .then(function (params)
                {
                    db.updateOneDevice(params)
                        .then(function (result)
                        {
                            send(req, res, result);

                        })
                        .catch(function (result)
                        {
                            send(req, res, result);

                        })
                })
                .catch(function (err)
                {
                    console.log(err);
                    send(req, res, err, 500)
                });
        }
    },
}