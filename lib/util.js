'use strict';

var request = require('request');
var baseUrl, config;

exports.init = function(cfg) {

	// set basic authentication using the url
	// https://github.com/request/request#http-authentication
	var auth = cfg.credentials.securenetId + ':' + cfg.credentials.securenetKey + '@';

	baseUrl = (cfg.mode === 'live')
		? 'https://' + auth + 'gwapi.securenet.com/api/'
		: 'https://' + auth + 'gwapi.demo.securenet.com/api/';

	config = cfg;
	return exports;
};


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

exports.post = function(partialUrl, params, next) {
	var url = baseUrl + partialUrl;
	var options = {
		method: 'POST',
		json: params
	};
	if (!params.developerApplication) params.developerApplication = config.developerApplication;
	return request(url, options, wrapCallback(next));
};

exports.put = function(partialUrl, params, next) {
	var url = baseUrl + partialUrl;
	var options = {
		method: 'PUT',
		json: params
	};
	if (!params.developerApplication) params.developerApplication = config.developerApplication;
	return request(url, options, wrapCallback(next));
};

exports.delete = function(partialUrl, params, next) {
	var url = baseUrl + partialUrl;
	var options = {
		method: 'DELETE',
		json: true
	};
	return request(url, options, wrapCallback(next));
};

exports.get = function(partialUrl, params, next) {
	var url = baseUrl + partialUrl;
	var options = {
		method: 'GET',
		json: true,
		qs: params
	};
	return request(url, options, wrapCallback(next));
};

exports.error = function(data, next) {
	return next(createError(data));
};
