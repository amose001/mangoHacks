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
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          redirect_uri: redirect_uri,
          state: state
      }));
});

app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
          querystring.stringify({
              error: 'state_mismatch'
          }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                  querystring.stringify({
                      access_token: access_token,
                      refresh_token: refresh_token
                  }));
            } else {
                res.redirect('/#' +
                  querystring.stringify({
                      error: 'invalid_token'
                  }));
            }
        });
    }
});

app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});


//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//pass our application into our routes
require('./app/routes')(app);

//start the server
app.listen(3000);
console.log('Server is online! (MangoHacks)');

//iptables
//sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
