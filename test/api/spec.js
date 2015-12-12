'use strict';
var should = require('should');
var SecureNet = require('../../index');
var config = {
	mode: 'test',
	credentials: {
		securenetId: process.env.SECURENET_ID,
		securenetKey: process.env.SECURENET_KEY
	},
	developerApplication: {
		developerId: 12345678,
		Version: '1.2'
	}
};

var api;

describe('Unit tests spec', function () {
	beforeEach(function () {
		api = new SecureNet(config);
	});

	it('credential found in environment variable', function () {
		config.credentials.securenetId.should.be.type('string');
		config.credentials.securenetKey.should.be.type('string');
	});

	it('has expected base methods', function () {
		// todo: list all public functions
		api.getBatch.should.be.type('function');
	});

	it('has expected base properties', function () {
		api.mode.should.be.type('string');
		api.securenetId.should.be.type('string');
		api.securenetKey.should.be.type('string');
	});

	it('supports multiple instances', function () {
		var a = new SecureNet(config);
		var b = new SecureNet({
			mode: 'live',
			credentials: {
				securenetId: 'fake',
				securenetKey: 'fake'
			},
			developerApplication: {
				developerId: 12345678,
				Version: '1.2'
			}
		});

		b.securenetKey.should.not.equal(a.securenetKey);
		b.securenetId.should.not.equal(a.securenetId);
		b.mode.should.not.equal(a.mode);
	});
});