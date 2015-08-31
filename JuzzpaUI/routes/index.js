/*
 * GET home page.
 */
var options = require('./../constants.js').http_options;
var http = require('http');

exports.index = function(req, res) {
	res.sendfile('./public/loginPage.html');
};

exports.register = function(req, res) {
	var jsonObject = {};
	console.log(req.query.merchantName);
	jsonObject.name = req.body.regName;
	jsonObject.emailId = req.body.emailId;
	jsonObject.mobileNumber = req.body.mobileNumber;
	jsonObject.password = req.body.password;
	options.path = "/register";
	var jsonString = JSON.stringify(jsonObject);
	console.log(jsonString);
	options.headers["Content-Length"] = jsonString.length;
	console.log(options);
	var request = http.request(options, function(response) {
		console.log('Status: ' + response.statusCode);
		if (response.statusCode === 200) {
			res.redirect("/successRegister");
		} else {
			res.redirect("/");
		}
	});
	request.write(jsonString);
	request.end();
};

exports.successRegister = function(req, res) {
	res.sendfile('./public/successfulRegistration.html');
};