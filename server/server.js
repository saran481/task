'use strict';
var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);

mongoose.connect(config.mongo.uri, {}, function (err) {
    if (err) {
        console.log("RUn Mongo");
    }
    require('./routes')(app);
});
server.listen(config.port, config.ip, function () {
    console.log('Server Running In ' + config.env + ' : %d', config.port);
});
module.exports = server;