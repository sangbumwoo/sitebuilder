var config = require('../config');
var mongoClient = require('mongodb').MongoClient;
//var bcrypt = require("bcrypt-nodejs");
// var jwt = require('express-jwt');
// var co = require('co');

// import series from 'async/series';
// var series

var async = require('async');

// var model = require('../../models/model');
var ObjectID = require('mongodb').ObjectID;

var db;
var collection;
mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err);
    else {
        db = database;
        console.log("db connected...");
    }
})



exports.list = function (req, res) {

    // let sort;
    // req.query.sort === 'asc' ? sort = 1 : sort = -1;

    res.send({ result : 'OK' });
    return;


}
