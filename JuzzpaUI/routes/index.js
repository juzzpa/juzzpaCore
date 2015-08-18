/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('loginPage');
};

var options = require('./../constants.js').http_options;
var http = require('http');
exports.createAccount = function(req, res) {
	res.render('createAccount');
};

exports.register = function(req, res) {
	var jsonObject = {};
	jsonObject.name = req.regName;
	jsonObject.emailId = req.emailId;
	jsonObject.mobileNumber = req.mobileNumber;
	jsonObject.password = req.password;
	options.path = "/register";
	var jsonString = JSON.stringify(jsonObject);
	options.headers["Content-Length"] = jsonString.length;
	console.log(options);
	var request = http.request(options, function(res) {
		console.log('Status: ' + res.statusCode);
		console.log(typeof res.redirect);
		if (res.statusCode === 200) {
			res.redirect("/successRegister");
		} else {
			res.redirect("/");
		}
	});
	request.write(jsonString);
	request.end();
};

exports.successRegister = function(req, res) {
	res.render('successfulRegistration');
};