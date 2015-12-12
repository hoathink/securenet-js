'use strict';
var should = require('should');
var SecureNet = require('../../index').init;
var credentials = {
	mode: 'test',
	securenetId: process.env.SECURENET_ID,
	secureKey: process.env.SECURENET_KEY
};
var api;

describe('Unit tests', function () {
	beforeEach(function () {
		api = new SecureNet(credentials);
	});

	it('has expected base properties and methods', function () {
		api.getBatch.should.be.type('function');
	});

	it('supports multiple instances', function () {
		var a = new SecureNet(credentials);
		var b = new SecureNet(credentials);

		/*b.basicAuth.username.should.not.equal(a.basicAuth.username);
		a.basicAuth.username.should.equal('user_a');
		b.basicAuth.username.should.equal('user_b');
		b._base.should.not.equal(a._base);*/
	});
});