'use strict';
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api;

describe('Spec', function () {
	beforeEach(function () {
		api = new SecureNet(example.config);
	});

	it('credential found in environment variable', function () {
		assert.typeOf(example.config.credentials.secureNetId, 'string');
		assert.typeOf(example.config.credentials.secureNetKey, 'string');
	});

	it('has expected base methods', function () {
		// todo: list all public functions
		assert.typeOf(api.getMode, 'function');
		assert.typeOf(api.getBatch, 'function');
	});

	it('supports multiple instances', function () {
		var a = new SecureNet(example.config);
		var b = new SecureNet({
			mode: 'live',
			credentials: {
				secureNetId: 'fake',
				secureNetKey: 'fake'
			},
			developerApplication: {
				developerId: 12345678,
				Version: '1.2'
			}
		});

		//different modes
		assert.equal(a.getMode(), 'test');
		assert.equal(b.getMode(), 'live');

		//different endpoints
		assert.equal(a.getBaseUrl(), 'https://gwapi.demo.securenet.com/api/');
		assert.equal(b.getBaseUrl(), 'https://gwapi.securenet.com/api/');

	});

	it('can change mode', function () {
		var a = new SecureNet(example.config);
		assert.equal(a.getMode(), 'test');

		a.setMode('live');

		assert.equal(a.getMode(), 'live');
	});
});