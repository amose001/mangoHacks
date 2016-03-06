// JavaScript source code
var express = require('express');
var Clarifai = require('./clarifai_node.js');
var CLARIFAI_ID = "7vnVnwWoY7heeIvNlVatC--4uMgdPGRUYa_LpX6V";
var CLARIFAI_SECRET = "T_eDYqVrqeEHoP5ZgD99BxX2ybjOIoxTWmAxboq8";
Clarifai.initAPI(CLARIFAI_ID, CLARIFAI_SECRET);
var server = require('../server.js');
exports.tags = [];
//var exports = module.exports = {};

function resultHandler(err, res) {
    if (err != null) {
        console.log(err);
    } else {
        //If tags exist they will be pushed into the tags array
        if (typeof res["status_code"] === "string" && (res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR")) {
            for (i = 0; i < res.results.length; i++) {
                if (res["results"][i]["status_code"] === "OK") {
                    exports.tags.push(res["results"][i].result["tag"]["classes"]);
                    console.log(res["results"][i].result["tag"]["classes"]);
                }
            }
        }
    }
}

exports.getTags = function () {
    console.log("KANYEHAMEHA");
    console.log(server.URL);
    //	var imageURL = 'http://i.imgur.com/72zJC8Y.jpg';
    //	var imageURL = server.URL;
    var imageURL = 'http://localhost:3000/uploads/sun.jpg';
    console.log(imageURL);

    var imageId = "uploadedImage";
    Clarifai.tagURL(imageURL, imageId, resultHandler);
    return exports.tags;
}

//getTags();