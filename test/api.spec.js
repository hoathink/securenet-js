'use strict';
var should = require('should');
var SecureNet = require('../index');
var credentials = {
	mode: 'test',
	securenetId: process.env.SECURENET_ID,
	securenetKey: process.env.SECURENET_KEY
};
var api;

describe('Unit tests', function () {
	beforeEach(function () {
		api = new SecureNet(credentials);
	});

	it('credential found in environment variable', function () {
		credentials.securenetId.should.be.type('string');
		credentials.securenetKey.should.be.type('string');
	});

	it('has expected base methods', function () {
		api.getBatch.should.be.type('function');
	});

	it('has expected base properties', function () {
		//api.basicAuth.should.be.type('object');
		api.mode.should.be.type('string');
		api.securenetId.should.be.type('string');
	});

	it('supports multiple instances', function () {
		var a = new SecureNet(credentials);
		var b = new SecureNet({
			mode: 'live',
			securenetId: 'fake',
			securenetKey: 'fake'
		});

		b.securenetKey.should.not.equal(a.securenetKey);
		b.securenetId.should.not.equal(a.securenetId);
		b.mode.should.not.equal(a.mode);
	});
});