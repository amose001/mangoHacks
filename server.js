//load express package and create our app
var fs		= require('fs');
var express = require('express');
var multer	= require('multer');
var bodyParser = require('body-parser');
var app 	= express();
var path	= require('path');
var part = require('./app/Clarifai_part.js');
var client_id = 'c0f7afc3520542959e587d2249cda4e1'; // Your client id
var client_secret = '8f15c046151345d88cb373847dece382'; // Your client secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
exports.URL = '';
app.use(bodyParser.json());

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

//pass our application into our routes
require('./app/routes')(app);

app.get('./public/', function(req, res)
{
	res.sender('index');
});

app.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req,res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	exports.URL = req.file.path;
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	var cat = req.file.destination.concat(req.file.originalname);
	//console.log(cat);
	//req.file.filename = req.file.originalname
	//console.log(req.file.filename);
	fs.rename(req.file.path, cat, function (err) {
		  if (err) throw err;
		    fs.stat(cat, function (err, stats) {
				    if (err) throw err;
					    console.log('stats: ' + JSON.stringify(stats));
		 });
	});
	res.status(204).end();
});


//start the server
app.listen(3000);
console.log('Server is online! (MangoHacks)');

//iptables
//sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
