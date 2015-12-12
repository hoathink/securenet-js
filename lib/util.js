var id, key, url, request, options;

exports.init = function(args) {
	id = '' + args.id;
	key = args.key;
	url = args.url || 'https://gwapi.demo.securenet.com/api/';
	request = require('request').defaults({ auth: { username: id, password: key }, json: true });
	options = args;
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
	if (!hostCallback) {
		return function() {};
	}
	return function(error, httpResponse, body) {
		if (error) {
			return hostCallback(createError({
				message:      'Could not communicate with ' + url,
				responseCode: httpResponse.statusCode
			}));
		}
		if (options.hideBlanks) {
			deleteNullProperties(body);
		}
		jsonExpand(body);
		return hostCallback(null, body);
	};
};

function encodeQueryData(data) {
	var ret = [];
	for (var d in data) {
		if (data.hasOwnProperty(d)) {
			var value = data[d];
			if (value === null) {
				continue;
			}
			if (value instanceof Date) {
				value = value.toJSON();
			}
			ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(value));
		}
	}
	return ret.join('&');
};

exports.post = function(partialUrl, params, callback) {
	return request(url + partialUrl, {
			method: 'POST',
			json: params
		},
		wrapCallback(callback));
};

exports.put = function(partialUrl, params, callback) {
	return request(url + partialUrl, {
			method: 'PUT',
			json: params
		},
		wrapCallback(callback));
};

exports.delete = function(partialUrl, params, callback) {
	return request(url + partialUrl, {
			method: 'DELETE',
			json: params
		},
		wrapCallback(callback));
};

exports.get = function(partialUrl, params, callback) {
	var actualUrl = url + partialUrl;
	if (params) {
		var paramString = encodeQueryData(params);
		if (paramString && paramString.length > 0) {
			actualUrl = actualUrl + '?' + paramString;
		}
	}
	return request.get(actualUrl, wrapCallback(callback));
};

exports.error = function(data, callback) {
	return callback(createError(data));
};
