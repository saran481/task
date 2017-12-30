'use strict';
var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const csv = require('csvtojson');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname)
    },
    filename: function (req, file, cb) {
        cb(null, 'task.csv')
    }
});
var data;
var upload = multer({ storage: storage });


var TaskSchema = new Schema({
    name: String,
    values: { type: Array, default: [] }
}, { versionKey: false });

var Task = mongoose.model('Task', TaskSchema);



router.post('/file', upload.any(), function (err, response) {
    var links = [];
    const csvFilePath = __dirname + '/task.csv';
    csv({ noheader: true })
        .fromFile(csvFilePath)
        .on('json', (jsonObj) => {
            var i = 0;
            for (var p in jsonObj) {
                if (jsonObj.hasOwnProperty(p)) {
                    if (i == 0) {
                        data = {
                            name: jsonObj[p]
                        }
                        i++;
                        var url = "http://localhost:4000/api/messages/getdata/" + jsonObj[p];
                        links.push(url);
                    }
                    else {
                        if (!data.values) data.values = [];
                        var year = jsonObj[p].split('|')[0];
                        var score = jsonObj[p].split('|')[1];
                        var result = {
                            year: year,
                            score: score
                        }
                        data.values.push(result);
                    }
                }
            }
            Task.create(data, function (err, data) {
                console.log(data);
            })
        })
        .on('done', (error) => {


            response.status(200).json(links);
        })




});


router.get('/getdata/:id', function (req, res) {
    Task.find({ name: req.params.id }, function (err, data) {
        res.status(200).json({ data: data });
    })
});

module.exports = router;




