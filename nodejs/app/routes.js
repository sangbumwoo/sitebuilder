var jwt = require('express-jwt');
var config = require('./config');
// var fs = require('fs');

var jwtCheck = jwt({
    secret: config.secret
});



var board = require('./controllers/board.js');
var user = require('./controllers/user.js');
var header = require('./controllers/header.js');
var config = require('./controllers/config.js');

// var restapi = require('./controllers/restapi.js');
// var admin = require('./controllers/admin.js');
// var manager = require('./controllers/manager.js');
// var client = require('./controllers/client.js');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // var fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
        // console.log('file.originalname', file.originalname);
        // var fileExt = file.originalname.substr(file.originalname.lastIndexOf('.'));

        // cb(null, fileName + '-' + Date.now() + fileExt);

        var uuid = require('uuid');
        var filename = uuid.v4() + file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, filename);

    }
});

// var jwt = require('jsonwebtoken');
// var config = require('../config');
function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    console.log('token', token);
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    
    console.log(jwt.vertiy);
    // jwt.verify(token, config.secret, function (err, decoded) {
    //     if (err)
    //         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    //     // if everything good, save to request for use in other routes
    //     req.userId = decoded.id;
    //     next();
    // });
    console.log('verifyToken.....');
    next();
}
module.exports = verifyToken;


module.exports = function (app) {

    var upload = multer({ storage: storage });
    app.post('/api/files', upload.single('file'), function (req, res) {
        console.log('zzzzzz', req.file);
        // res.send(req.file.filename)
        res.json(req.file)
    });



    // var upload = multer({ storage: storage }).single('file');

    // app.post('/api/files', function (req, res, next) {
    //     upload(req, res, function (err) {
    //         console.log(req) // here i see other fields from request like req.body.description
    //         if (err) { return next(err) }
    //         // res.json(201)
    //         res.send(req.file.filename)
    //     })
    // });



    // app.get('/board', function(req, res) {
    //     res.send("OK");
    // })


    // const asyncHandler = require('express-async-handler')

    // app.get('/board', asyncHandler(async (req, res, next) => {
    //     const bar = await board.list();
    //     console.log('bar', bar)
    //     res.send(bar);
    // }))


    app.get('/api/board', jwtCheck, board.list);
    app.get('/api/board/:sid', board.view);
    app.get('/api/board/page/:articleType', board.pageview);
    app.post('/api/board', board.create);
    app.put('/api/board/:sid', board.update);
    app.delete('/api/board/:sid', board.delete);
    app.post('/api/board/sendmail', board.sendmail);

    app.get('/api/header/:articleType', header.get);
    app.put('/api/header', header.update);
    app.delete('/api/header/:sid', header.delete);

    app.post('/api/user/login', user.login);
    app.post('/api/user/signup', user.signup);
    app.get('/api/user/list', user.list);

    app.get('/api/config', config.list)


};

