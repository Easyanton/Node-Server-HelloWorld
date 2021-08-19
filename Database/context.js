//var mongo = require('mongodb');

var mongoClient = require('mongodb').MongoClient;

let dbName = "NodeServerDB";
let connectioString = "mongodb://localhost:27017/?readPreference=primary&appname=mongodb-vscode%200.6.10&directConnection=true&ssl=false";
let collection = "device";

let dbo;

// The create database function creates the database and the device collection, if it does not exit.
exports.createDB = function ()
{
    mongoClient.connect(connectioString, function (err, db)
    {
        if (err) 
        {
            console.log("CreateDB ERROR");
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
                console.log("Item already exits");
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
            console.log("connect ERROR");
            dbo.close();
            throw err;
        }

        dbo = db.db(dbName);;

        dbo.createCollection(collName, function (err, res)
        {
            if (err) throw err;
            console.log("Collection created");
            //dbo.close();

            return;
        });

    });
}

exports.insertDataToCollection = function (collName, params)
{
    return new Promise(async function (resolve, reject) 
    {
        mongoClient.connect(connectioString, function (err, db)
        {
            if (err) 
            {
                console.log("insertDataToCollection ERROR");
                db.close();
                throw err;
            }

            var dbo = db.db(dbName);

            // new Promise(async function (resolve, reject)
            // {

            try
            {
                var newObj = {
                    id: params.Id,
                    DeviceName: params.DeviceName,
                    Description: params.Description
                };

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

// function CollectionExistCheck(db, collectioname)
// {
//     let exist = false;

//     // This will go through the holde database and is therefore not optimal, and must be changest later.
//     db.listCollections({ name: collectioname })
//         .next(function (err, collinfo)
//         {
//             if (collinfo)
//             {
//                 console.log("Collection exist.");
//                 exist = true;
//             }
//         });

//     return exist;
// }