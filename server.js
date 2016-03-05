//load express package and create our app
var express = require('express');
var app 	= express();
var path	= require('path');

//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//pass our application into our routes
require('./app/routes')(app);

//start the server
app.listen(3000);
console.log('Server is online! (MangoHacks)');

//iptables
//sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
