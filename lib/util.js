'use strict';

var request = require('request');

module.exports = function(options) {

	var config, mode, auth, obj = {};

	//initialize
	// set basic authentication using the url
	// https://github.com/request/request#http-authentication
	auth = options.credentials.secureNetId + ':' + options.credentials.secureNetKey + '@';
	mode = options.mode;
	config = options;

	////////////////////////////////////////////////////////////////////////////////
	// Private Function
	////////////////////////////////////////////////////////////////////////////////


	//convert date strings to dates
	function jsonExpand(test) {
		if (!test) {
			return;
		}
		if (typeof test !== 'object') {
			return;
		}
		for (var i in test) {
			if (test[i] === null) {
				continue;
			}
			if (typeof test[i] === 'object') {
				jsonExpand(test[i]);
				continue;
			}
			if (typeof test[i] === "string" && /ate/.test(i) && (test[i].length >= 20 && test[i].length <= 24)) {
				var value = test[i].replace(/\.000Z$/, '');
				var dateNum = Date.parse(test[i]);
				if (dateNum && ! isNaN(dateNum)) {
					test[i] = new Date(dateNum);
				}
			}
		}
	};

	function deleteNullProperties(test) {
		if (!test) {
			return test;
		}
		for (var i in test) {
			if (test[i] === null) {
				delete test[i];
			} else if (typeof test[i] === 'object') {
				deleteNullProperties(test[i]);
			}
		}
		return test;
	};

	function createError(data) {
		return {
			success:      false,
			result:       data.result || 'COMMUNICATION_ERROR',
			message:      data.message || 'An unknown error has occurred',
			responseCode: data.responseCode
		};
	};

	function wrapCallback(hostCallback) {

		if (!hostCallback) return function(){}

		return function(error, httpResponse, body) {
			if (error) {
				return hostCallback(createError({
					message:      'Could not communicate with ' + url,
					responseCode: httpResponse.statusCode
				}));
			}
			if (config.hideBlanks) {
				deleteNullProperties(body);
			}
			jsonExpand(body);
			return hostCallback(null, body);
		};
	};

	////////////////////////////////////////////////////////////////////////////////
	// Public Function
	////////////////////////////////////////////////////////////////////////////////

	obj.mode = function(str){
		if (str) mode = str;
		return mode;
	};

	obj.baseUrl = function(){
		return (mode === 'live')
			? 'https://gwapi.securenet.com/api/'
			: 'https://gwapi.demo.securenet.com/api/';
	};

	obj.basicAuthUrl = function(){
		var base = this.baseUrl();
		var url = base.replace('https://', 'https://' + auth);
		return url;
	};

	obj.post = function(partialUrl, params, next) {
		var url = this.basicAuthUrl() + partialUrl;
		var options = {
			method: 'POST',
			json: params
		};
		if (!params.developerApplication) params.developerApplication = config.developerApplication;
		return request(url, options, wrapCallback(next));
	};

	obj.put = function(partialUrl, params, next) {
		var url = this.basicAuthUrl() + partialUrl;
		var options = {
			method: 'PUT',
			json: params
		};
		if (!params.developerApplication) params.developerApplication = config.developerApplication;
		return request(url, options, wrapCallback(next));
	};

	obj.delete = function(partialUrl, params, next) {
		var url = this.basicAuthUrl() + partialUrl;
		var options = {
			method: 'DELETE',
			json: true
		};
		return request(url, options, wrapCallback(next));
	};

	obj.get = function(partialUrl, params, next) {
		var url = this.basicAuthUrl() + partialUrl;
		var options = {
			method: 'GET',
			json: true,
			qs: params
		};
		return request(url, options, wrapCallback(next));
	};


/*	obj.error = function(data, next) {
		return next(createError(data));
	};*/

	return obj;
}










