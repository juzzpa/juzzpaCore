/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('loginPage');
};

exports.createAccount = function(req, res) {
	res.render('createAccount');
};

exports.register = function(req, res) {
	console.log(req.query);
	res.send(req.query);
};