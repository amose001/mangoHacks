module.exports = function(app) //javascript is able to ignore arguments (if absent)
{
	app.get('*', function(req, res){ res.sendfile('.public/index.html'); });
};

