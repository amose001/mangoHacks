var Cl = require('./Clarifai_part.js') //careful with this path, might not work
module.exports = function(app) //javascript is able to ignore arguments (if absent)
{
	app.get('/getTag', function(req, res){ 
		res.render('tags.ejs', { tags: Cl.getTags() });
	});
	app.get('*', function(req, res){ res.sendFile('/public/index.html'); });
	//app.get('/getTag', function(req, res){ Cl.getTags() });
};

