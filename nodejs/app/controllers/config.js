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


    // const menus = [
    //     { title: 'home', type: 'home' },
    //     { title: 'react.js', type: 'page' }, // type: page, list, tabs ...
    //     { title: 'vue.js', type: 'list' },
    //     { title: 'angular', type: 'tabs' },
    // ]

    const menus = [{
            id: "0",
            title: "홈",
            path: "home",
            type: "dashboard",
            children: []
        },
        {
            id: "0a",
            title: "about",
            // path: "korea-sdsn",
            // type: "list",
            children: [{
                id: "0a-1",
                title: "인사말",
                path: "greeting",
                type: "page",
                children: []
            },
            {
                id: "0a-2",
                title: "메시지",
                children: [
                    {
                        id: "0a-2-1",
                        title: "한국SDSN 명예회장",
                        path: "honor-chairman",
                        type: "page",
                        children: []
                    },
                    {
                        id: "0a-2-2",
                        title: "한국SDSN 고문단 의장",
                        path: "consult-chairman",
                        type: "page",
                        children: []
                    },
            
                ]
            }]
        },
        {
            id: "1",
            title: "강좌",
            path: "tutorial",
            // type: "list",
            children: [{
                    id: "1-1",
                    title: "React",
                    path: "react",
                    type: "list",
                    children: []

                },
                {
                    id: "1-2",
                    title: "Angular",
                    path: "angular",
                    type: "list",
                    children: []
                },
                {
                    id: "1-3",
                    title: "vue",
                    path: "vue",
                    type: "list",
                    children: []
                }

            ]
        },
        // {
        //     id: "5",
        //     title: "설정",
        //     path: "setting",
        //     type: "setting",
        //     isStatic: true,
        //     children: []
        // }
    ];

    console.log('config.list')
    res.send(menus);
    return;


}
