/*eslint-disable no-unused-vars*/
'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../../index');
var example = require('../../support/data');
var api, paymentMethodId, customerId, planId;

describe('Workflows - online SAAS application', function() {

	//set the timeout
	this.timeout(15000);

	beforeEach(function() {
		api = new SecureNet(example.config);
	});

	it('Signup (in browser) - send card (PCI data) directly to SecureNet', function(next) {

		var params = {
			publicKey: example.publicKey, //get this from virtual terminal
			check: example.check,
			addToVault:  true
		};

		//console.log('params', params );

		/*
		{ publicKey: '...',
			check: {
				name: 'John Smith',
				routingNumber: 222371863,
				accountNumber: 123456
			},
			addToVault: true
		}
		*/

		api.tokenize(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*
			{
				"token": "695c0f49-2a37-4ac6-8416-79fa429e3f26",
				"customerId": "181811",
				"success": true,
				"responseCode": 1,
				"message": "Approved",
				"responseDateTime": "2014-07-20T04:11:47.99Z"
			}
			*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);

			//setup for next test
			paymentMethodId = res.token;
			customerId = res.customerId;

			next();
		});
	});

	it('Confirmation (in server) - create recurring payment plan', function(next) {

		//setup
		var params = {
			customerId: customerId,
			plan: {
				cycleType: 'monthly',
				dayOfTheMonth: 1,
				dayOfTheWeek: 1,
				month: 6,
				frequency: 10,
				amount: 22.95,
				startDate: '2016-10-01',
				endDate: null,
				maxRetries: 4,
				primaryPaymentMethodId: paymentMethodId,
				//secondaryPaymentMethodId: REPLACE_ME,
				notes: 'This is a recurring plan',
				active: true,
				userDefinedFields: example.userDefinedFields
			}
		};

		//make customer change
		api.createRecurringPlan(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			planId = res.planId;

			next();
		});
	});
	it('Operations (in server) - get customer for some operations reason', function(next) {

		//setup
		var params = {
			customerId: customerId
		};

		//make customer change
		api.getCustomer(params, function(err, res) {
			if (err) return next(err);

			//if (!res.success) console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test

			next();
		});
	});

	it('Operations (in server) - get payment method for some operations reason', function(next) {

		//setup
		var params = {
			customerId: customerId,
			paymentMethodId: paymentMethodId
		};

		//make customer change
		api.getCustomerPaymentMethod(params, function(err, res) {
			if (err) return next(err);

			//if (!res.success) console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test

			next();
		});
	});

});


