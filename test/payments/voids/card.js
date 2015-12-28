'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../../index');
var example = require('../../support/data');
var api, transactionId;

describe('Payments/void to card', function() {

	//set the timeout
	this.timeout(15000);

	before(function() {
		api = new SecureNet(example.config);
	});

	it('charge card so we have something to void', function(next) {

		//setup
		var params = {
			amount: 11.00,
			card: example.card,
			extendedInformation: example.extendedInformation
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
			transactionId = res.transaction.transactionId;

			next();
		});
	});

	it('void preivous (unsettled) transaction', function(next) {

		var params = {
			transactionId: transactionId
		};

		api.void(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);

			//setup for next test

			next();
		});
	});
});


