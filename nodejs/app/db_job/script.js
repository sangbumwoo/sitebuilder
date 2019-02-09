var config = require('../config');
var mongoClient = require('mongodb').MongoClient;
var async = require('async');

var ObjectID = require('mongodb').ObjectID;

var db;
var collection;
mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err);
    else {
        db = database;
        console.log("db connected...");

        // db.Setting.find({ 'Value.Tiers.0.AssetsUnderManagement': { $exists: 1 } }).snapshot().forEach(function (item) {
        //     for (i = 0; i != item.Value.Tiers.length; ++i) {
        //         item.Value.Tiers[i].Aum = item.Value.Tiers[i].AssetsUnderManagement;
        //         delete item.Value.Tiers[i].AssetsUnderManagement;
        //     }
        //     db.Setting.update({ _id: item._id }, item);
        // });


        db.collection('board').find({}).toArray(function(err,docs){
            console.log(docs.length);
            docs.forEach(element => {
                // console.log(element.images.length);
                element.images.forEach(item => {
                    if (!item.originalname) {
                        item.originalname = item.filename;
                    }
                })
                element.files.forEach(item => {
                    if (!item.originalname) {
                        item.originalname = item.filename;
                    }
                })
            });

            docs.forEach(element => {
                // element.images.forEach(item => {
                //     console.log(item)
                // })
                // element.files.forEach(item => {
                //     console.log(item)
                // })
                db.collection('board').update({ _id: element._id }, element);

            });
            
        })




    }
})

