// JavaScript source code
//var Clarifai = require('./clarifai_node.js');
var CLIENT_ID = "7vnVnwWoY7heeIvNlVatC--4uMgdPGRUYa_LpX6V";
var CLIENT_SECRET = "T_eDYqVrqeEHoP5ZgD99BxX2ybjOIoxTWmAxboq8";
Clarifai.initAPI(CLIENT_ID, CLIENT_SECRET);

function exampleTagSingleURL() {
	var imageURL = '';//url of the image that was uploaded
	var imageId = "uploadedImage";

	Clarifai.tagURL( imageURL , imageId, commonResultHandler );
}
