'use strict';
var path = require('path'),
    _ = require('lodash');

var ip = 'localhost';


module.exports = {
    env: process.env.ENV,
    root: path.normalize(__dirname + '/../..'),
    port: 3000,
    ip: process.env.IP || undefined,
    server: { url: 'http://localhost' },
    mongo: {
        uri: 'mongodb://' + ip + '/taskdb'
    }
};