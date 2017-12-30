'use strict';
var express = require("express");
var config = require('./config');
module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        next();
    });
    // API
    app.use('/api/file', require('./index'));
    app.route('/*')
        .get(function (req, res) {
            res.sendFile( 'public/index.html', {
                root: config.root
            });

        });
};