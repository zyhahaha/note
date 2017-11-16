var _lib_request = require('request');

var util_http = {
	_request_: _lib_request,

	request: function(url, next){
		_request_(url, function(error, response, body){
			// console.log('error:', error); // Print the error if one occurred
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log('body:', body); // Print the HTML for the Google homepage.

			next(error, response, body);
		});
	},

	post: function(url, form_json){
		_request_.post(url, {form: form_json});
	}

};
exports = module.exports = util_http;