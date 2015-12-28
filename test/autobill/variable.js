'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, customerId, paymentMethodId, planId;

describe('AutoBill - variable plan', function() {

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


	it.skip('createVariablePlan card', function(next) {

		//setup
		var params = {
			customerId: customerId,
			plan: {
				planStartDate: '10/1/2016',
				planEndDate: '01/01/2020',
				primaryPaymentMethodId: paymentMethodId,
				//secondaryPaymentMethodId: REPLACE_ME,
				maxRetries:4,
				notes: 'This is a variable payment plan',
				scheduledPayments: [
					{amount: 132.89, paymentDate: '10/1/2016'}
				],
				userDefinedFields: example.userDefinedFields
			}
		};

		//make customer change
		api.createRecurringPlan(params, function(err, res) {
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

	it.skip('updateVariablePlan card', function(next) {

		//setup
		var params = {
			customerId: customerId,
			planId: planId,
			plan: {
				scheduledPayments: [
					{scheduleId: 1093233, amount: 132.89, paymentDate: '10/1/2016'}
				]
			}
		};

		//make customer change
		api.updateVariablePlan(params, function(err, res) {
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

	it.skip('getPlan card', function(next) {

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


