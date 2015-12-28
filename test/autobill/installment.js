'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, customerId, paymentMethodId, planId;

describe('AutoBill - installment plan', function() {

	//set the timeout
	this.timeout(15000);

	before(function() {
		api = new SecureNet(example.config);
	});

	it('createCustomer in vault', function(next) {

		var params = example.customer;

		api.createCustomer(params, function(err, res) {
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

	it('createCustomerPaymentMethod card', function(next) {

		//setup
		var method = {
			customerId: customerId,
			card: example.card,
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

			/**/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.typeOf(res.vaultPaymentMethod, 'object');
			assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			paymentMethodId = res.vaultPaymentMethod.paymentId; //note: this look like a API bug

			next();
		});
	});


	it('createInstallmentPlan card', function(next) {

		//setup
		var params = {
			customerId: customerId,
			plan: {
				cycleType: 'monthly',
				dayOfTheMonth: 1,
				frequency: 1,
				numberOfPayments: 12,
				installmentAmount: 276.95,
				remainderAmount: 12.90,
				balloonPaymentAddedTo: 'FIRST',
				remainderPaymentAddedTo: 'LAST',
				startDate: '10/1/2016',
				endDate: '10/1/2020',
				maxRetries: 4,
				primaryPaymentMethodId:  paymentMethodId,
				//secondaryPaymentMethodId: REPLACE_ME,
				notes: 'This is an installment plan',
				active: true,
				userDefinedFields: example.userDefinedFields
			}
		};

		//make customer change
		api.createInstallmentPlan(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{*/

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

	it.skip('updateInstallmentPlan card', function(next) {

		//setup
		var params = {
			customerId: customerId,
			planId: planId,
			plan: {
				cycleType: 'monthly',
				dayOfTheMonth: 1,
				frequency: 1,
				numberOfPayments: 15,
				installmentAmount: 300.95,
				remainderAmount: 17.90,
				balloonPaymentAddedTo: 'FIRST',
				remainderPaymentAddedTo: 'LAST',
				startDate: '10/1/2016',
				endDate: '10/1/2020',
				maxRetries: 4,
				notes: 'This is an updated installment plan',
				active: true
			}
		};

		//console.log('params', params);

		//make customer change
		api.updateRecurringPlan(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/**/

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

	it('getPlan card', function(next) {

		//setup
		var params = {
			customerId: customerId,
			planId: planId
		};

		//make customer change
		api.getPlan(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/**/

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

/*	it('deletePlan', function(next) {

		//setup
		var params = {
			customerId: customerId,
			planId: planId
		};

		//make customer change
		api.deletePlan(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test

			next();
		});
	});
*/

});


