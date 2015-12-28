/*eslint-disable no-unused-vars*/
'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, customerId, paymentMethodId;

describe('Payments transactions - check', function() {

	//set the timeout
	this.timeout(15000);

	before(function() {
		api = new SecureNet(example.config);
	});

	it('charge - using check data', function(next) {

		//setup
		var params = {
			amount: 11.00,
			addToVault: true,
			check: example.check
		};
		api.charge(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/**/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.customerId, 'string');

			//setup for next test
			//customerId = res.customerId;

			next();
		});
	});

	it('createCustomer in vault', function(next) {
		api.createCustomer(example.customer, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.typeOf(res.customerId, 'string');

			//setup for next test
			customerId = res.customerId;

			next();
		});
	});

	it('createCustomerPaymentMethod check', function(next) {

		//setup
		var method = {
			customerId: customerId,
			check: example.check,
			phone: '512-250-7865',
			notes: 'Create a vault account',
			accountDuplicateCheckIndicator: 0,
			primary: true,
			userDefinedFields: example.userDefinedFields
		};

		//make customer change
		api.createCustomerPaymentMethod(method, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			paymentMethodId = res.vaultPaymentMethod.paymentId;

			next();
		});
	});

	it('charge - using check data stored in vault', function(next) {

		//setup
		var params = {
			amount: 11.00,
			check: example.check
		};
		api.charge(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.customerId, 'string');

			//setup for next test
			//customerId = res.customerId;

			next();
		});
	});

});


