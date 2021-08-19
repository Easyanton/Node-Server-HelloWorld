

/*
 This one big .js file, contains the databse context stuff and all the services.
*/


var mongoClient = require('mongodb').MongoClient;

let dbName = "NodeServerDB";
let connectioString = "mongodb://localhost:27017/?readPreference=primary&appname=mongodb-vscode%200.6.10&directConnection=true&ssl=false";

// TODO: This value should  be from the "req", and not a fixed value.
let collection = "device";

let dbo;

// The create database function creates the database and the device collection, if it does not exit.
exports.createDB = function ()
{
    mongoClient.connect(connectioString, function (err, db)
    {
        if (err) 
        {
            console.log("Connect ERROR");
            dbo.close();
            throw err;
        }

        console.log("Database created!");

        dbo = db.db(dbName);;

        dbo.listCollections().toArray(function (err, items)
        {
            if (err) throw err;

            if (items.length == 0)
            {
                console.log("No collections in database")
                db.close();
                exports.createCollection(collection);
            }
            if (items.length > 0)
            {
                console.log("Collection already exits");
            }

        });
    });
}

exports.createCollection = function (collName)
{
    mongoClient.connect(connectioString, function (err, db)
    {
        if (err) 
        {
            console.log("Connect ERROR");
            dbo.close();
            throw err;
        }

        dbo = db.db(dbName);;

        dbo.createCollection(collName, function (err, res)
        {
            if (err) throw err;
            console.log("Collection created");

            return;
        });

    });
}

exports.getDeviceById = function (deviceId)
{
    return new Promise(async function (resolve, reject) 
    {
        mongoClient.connect(connectioString, async function (err, db)
        {
            if (err) 
            {
                console.log("Connect ERROR");
                db.close();
                throw err;
            }

            var dbo = db.db(dbName);

            var query = { DeviceId: deviceId };

            findInCollection(dbo, query, resolve);

            return;
        })
    })

}



exports.deleteDeviceById = function (deviceId)
{
    return new Promise(async function (resolve, reject) 
    {
        mongoClient.connect(connectioString, async function (err, db)
        {
            if (err) 
            {
                console.log("Connect ERROR");
                db.close();
                throw err;
            }

            let dbo = db.db(dbName);

            var query = { DeviceId: deviceId };

            deleteInCollection(dbo, query, resolve);

            return;
        })
    })

}

exports.getAllDevices = function ()
{
    return new Promise(async function (resolve, reject) 
    {
        mongoClient.connect(connectioString, async function (err, db)
        {
            if (err) 
            {
                console.log("Connect ERROR");
                db.close();
                throw err;
            }

            var dbo = db.db(dbName);

            findInCollection(dbo, {}, resolve);

            return;
        })
    })
}



exports.insertDataToCollection = function (collName, params)
{
    return new Promise(async function (resolve, reject) 
    {
        mongoClient.connect(connectioString, function (err, db)
        {
            if (err) 
            {
                console.log("Connect ERROR");
                db.close();
                throw err;
            }

            var dbo = db.db(dbName);

            try
            {

                // Check if it alredy exist;
                let status = 0;
                var query = { DeviceId: params.DeviceId };

                new Promise((resolve, reject) => dbo.collection(collection).find(query).toArray(function (err, result)
                {
                    if (err) throw err;

                    if (result == "[object Object]")
                    {
                        status = 1;
                    }

                    resolve();
                })).then(() =>
                {
                    if (status)
                    {
                        resolve("Data alredy exist in the database");
                    }
                    else  
                    {
                        // Create new data.
                        var newObj = {
                            DeviceId: params.DeviceId,
                            DeviceName: params.DeviceName,
                            Description: params.Description
                        };

                        // Insert data in collection.
                        dbo.collection(collName).insertOne(newObj, function (err, res)
                        {
                            if (err) 
                            {
                                console.log("Insert ERROR");
                                db.close();
                                throw err;
                            }
                            resolve("Data added with success");
                        });
                    }
                });

                return;
            }
            catch (err)
            {
                console.log("Insert ERROR");
                console.log(err);
                reject(err);
            }
        })
    });
}

exports.updateOneDevice = function (params)
{
    return new Promise(async function (resolve, reject) 
    {
        mongoClient.connect(connectioString, function (err, db)
        {
            if (err) 
            {
                console.log("Connect ERROR");
                db.close();
                throw err;
            }

            var dbo = db.db(dbName);

            try
            {
                // Check if it exist;
                let status = 0;
                var query = { DeviceId: params.DeviceId };

                new Promise((resolve, reject) => dbo.collection(collection).find(query).toArray(function (err, result)
                {
                    if (err) throw err;

                    if (result == "[object Object]")
                    {
                        status = 1;
                    }

                    resolve();
                })).then(() =>
                {
                    if (!status)
                    {
                        resolve("No data in database, so it can't be updated");
                    }
                    else  
                    {
                        // TODO: Make it possible to only update some param's.
                        // Set new object.
                        // var newvalues = {' $set: { ';
                        // newvalues += (params.DeviceId == "") ? "" : "DeviceId: " + "\"" + params.DeviceId + "\", ";
                        // newvalues += (params.DeviceName == "") ? "" : "DeviceName: " + "\"" + params.DeviceName + "\", ";
                        // newvalues += (params.Description == "") ? "" : "Description: " + "\"" + params.Description + "\""; //params.Description
                        // newvalues += " }" };                        

                        var newvalues = {
                            $set: {
                                DeviceId: params.DeviceId,
                                DeviceName: params.DeviceName,
                                Description: params.Description
                            }
                        };

                        console.log("This is the new values ");
                        console.log(newvalues);

                        dbo.collection(collection).updateOne(query, newvalues, function (err, res)
                        {
                            if (err) 
                            {
                                console.log("Update ERROR");
                                db.close();
                                throw err;
                            }
                            resolve("Device updated with success");
                            console.log("1 document updated");
                        });


                        return;
                    }
                })
            }
            catch (err)
            {
                console.log("Insert ERROR");
                console.log(err);
                reject(err);
            }
        })
    });
}

async function findInCollection(dbo, query, resolve)
{
    await dbo.collection(collection).find(query).toArray(function (err, result)
    {
        if (err) throw err;
        console.log(result);

        if (result != "")
        {
            resolve(result);
        }
        else
        {
            resolve("No device(s) exist.")
        }
    });
}

async function deleteInCollection(dbo, query, resolve)
{

    await dbo.collection(collection).deleteOne(query, function (err, obj)
    {
        if (err) throw err;

        console.log(query);
        console.log(obj);

        if (obj.deletedCount > 0)
        {
            resolve(obj.deletedCount + " device deleted");
        }
        else
        {
            resolve("No device(s) deleted.")
        }
    });
}