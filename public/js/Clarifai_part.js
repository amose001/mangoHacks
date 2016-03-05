// JavaScript source code

var Clarifai = require('./clarifai_node.js');
var CLARIFAI_ID = "7vnVnwWoY7heeIvNlVatC--4uMgdPGRUYa_LpX6V";
var CLARIFAI_SECRET = "T_eDYqVrqeEHoP5ZgD99BxX2ybjOIoxTWmAxboq8";
Clarifai.initAPI(process.env.CLARIFAI_ID, process.env.CLARIFAI_SECRET);
var tags = [];

function getTags() {
	var imageURL = '';//url of the image that was uploaded
	var imageId = "uploadedImage";
	Clarifai.tagURL( imageURL , imageId, resultHandler );
}

function resultHandler( err, res ) {
	if( err != null ) {
		console.log(err);
	}else {
		if( opts["print-results"] ) {
			//If tags exist they will be pushed into the tags array
			if( typeof res["status_code"] === "string" &&( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {
				for( i = 0; i < res.results.length; i++ ) {
					if( res["results"][i]["status_code"] === "OK" ) {
						tags.push(res["results"][i].result["tag"]["classes"]);
					}
				}
			}
		}
	}
}

