'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, transactionId;

describe('Transacations - searching', function() {

	//set the timeout
	this.timeout(25000);

	before(function() {
		api = new SecureNet(example.config);
	});

	it('getTransactions', function(next) {

		//setup
		var params = {};
		api.getTransactions(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res.transactions[0]);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.typeOf(res.transactions, 'array');
			//assert.isNumber(res.transaction.transactionId);

			//setup for next test
			var transaction = res.transactions[0];
			transactionId = transaction.transactionId;

			next();
		});
	});

	it('getTransaction', function(next) {

		//setup
		var params = {
			transactionId: transactionId
		};
		api.getTransaction(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);

			//setup for next test

			next();
		});
	});

	it('updateTransaction', function(next) {

		//setup
		var params = {
			referenceTransactionId: transactionId,
			email: 'somebody@example.com'
		};
		api.updateTransaction(params, function(err, res) {
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


