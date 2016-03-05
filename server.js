//load express package and create our app
var express = require('express');
var app 	= express();
var path	= require('path');
var 	part = require('./app/Clarifai_part.js');
var client_id = 'c0f7afc3520542959e587d2249cda4e1'; // Your client id
var client_secret = '8f15c046151345d88cb373847dece382'; // Your client secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
/*
var Clarifai = require('./public/js/clarifai_node.js');

var CLIENT_ID = "7vnVnwWoY7heeIvNlVatC--4uMgdPGRUYa_LpX6V";
var CLIENT_SECRET = "T_eDYqVrqeEHoP5ZgD99BxX2ybjOIoxTWmAxboq8";
Clarifai.initAPI(CLIENT_ID, CLIENT_SECRET);

function resultHandler( err, res ) {
	if( err != null ) {
		console.log(err);
	}else {
		if( typeof res["status_code"] === "string" &&( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {
			for( i = 0; i < res.results.length; i++ ) {
				if( res["results"][i]["status_code"] === "OK" ) {
					console.log(res["results"][i].result["tag"]["classes"]);						}
			}
		}
	}
}

function igetTags(){
	var imageURL = 'http://i.imgur.com/pbDpoqG.jpg';
	var imageID = "uploadedImage";
	Clarifai.tagURL(imageURL, imageID, resultHandler);
}
*/
//console.log(part);
exports.hello = function(){
	console.log("Hello world");
}
part.getTags();
//Clarifai starts here
//var part 	= require('./libs/Clarifai_part.js');

//SPOTIFY AUTHORIZATION BEGINS HERE



//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//pass our application into our routes
require('./app/routes')(app);

//start the server
app.listen(3000);
console.log('Server is online! (MangoHacks)');

//iptables
//sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
