'use strict';
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api;

describe('Spec - features', function () {
	before(function () {
		api = new SecureNet(example.config);
	});

	it('credential found in environment variable', function () {
		assert.typeOf(example.config.credentials.secureNetId, 'string');
		assert.typeOf(example.config.credentials.secureNetKey, 'string');
	});

	it('has expected base methods', function () {

		//config
		assert.typeOf(api.getMode, 'function');
		assert.typeOf(api.setMode, 'function');
		assert.typeOf(api.getBaseUrl, 'function');

		//tokenization
		assert.typeOf(api.tokenize, 'function');

		//settlement
		assert.typeOf(api.getBatch, 'function');
		assert.typeOf(api.getCurrentBatch, 'function');
		assert.typeOf(api.closeBatch, 'function');

		//transactions
		assert.typeOf(api.authorize, 'function');
		assert.typeOf(api.capture, 'function');
		assert.typeOf(api.charge, 'function');
		assert.typeOf(api.verify, 'function');

		//vault
		assert.typeOf(api.createCustomer, 'function');
		assert.typeOf(api.getCustomer, 'function');
		assert.typeOf(api.updateCustomer, 'function');
		assert.typeOf(api.createCustomerPaymentMethod, 'function');
		assert.typeOf(api.getCustomerPaymentMethod, 'function');
		assert.typeOf(api.updateCustomerPaymentMethod, 'function');
		assert.typeOf(api.deleteCustomerPaymentMethod, 'function');

		//autobill
		assert.typeOf(api.createInstallmentPlan, 'function');
		assert.typeOf(api.updateInstallmentPlan, 'function');
		assert.typeOf(api.createVariablePlan, 'function');
		assert.typeOf(api.updateVariablePlan, 'function');
		assert.typeOf(api.createRecurringPlan, 'function');
		assert.typeOf(api.updateRecurringPlan, 'function');

		assert.typeOf(api.getPlan, 'function');
		//assert.typeOf(api.deletePlan, 'function');

		//credits, refunds and voids
		assert.typeOf(api.credit, 'function');
		assert.typeOf(api.refund, 'function');
		assert.typeOf(api.void, 'function');

		//transactions
		assert.typeOf(api.getTransactions, 'function');
		assert.typeOf(api.getTransaction, 'function');
		assert.typeOf(api.updateTransaction, 'function');

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
