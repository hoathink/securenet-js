'use strict';
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api;

describe('Spec - throws errors', function () {
	before(function () {
		api = new SecureNet(example.config);
	});

	//transactions
	it('authorize', function (next) {
		assert.throw(api.authorize);
		next();
	});
	it('capture', function (next) {
		assert.throw(api.capture);
		next();
	});
	it('charge', function (next) {
		assert.throw(api.charge);
		next();
	});
	it('verify', function (next) {
		assert.throw(api.verify);
		next();
	});

	//vault
	it('createCustomer', function (next) {
		assert.throw(api.createCustomer);
		next();
	});
	it('updateCustomer', function (next) {
		assert.throw(api.updateCustomer);
		next();
	});
	it('createCustomerPaymentMethod', function (next) {
		assert.throw(api.createCustomerPaymentMethod);
		next();
	});
	it('getCustomerPaymentMethod', function (next) {
		assert.throw(api.getCustomerPaymentMethod);
		next();
	});
	it('updateCustomerPaymentMethod', function (next) {
		assert.throw(api.getCustomerPaymentMethod);
		next();
	});
	it('deleteCustomerPaymentMethod', function (next) {
		assert.throw(api.deleteCustomerPaymentMethod);
		next();
	});

	//autobill
	it('createInstallmentPlan', function (next) {
		assert.throw(api.createInstallmentPlan);
		next();
	});
	it('updateInstallmentPlan', function (next) {
		assert.throw(api.updateInstallmentPlan);
		next();
	});
	it('createVariablePlan', function (next) {
		assert.throw(api.createVariablePlan);
		next();
	});
	it('updateVariablePlan', function (next) {
		assert.throw(api.updateVariablePlan);
		next();
	});
	it('createRecurringPlan', function (next) {
		assert.throw(api.createRecurringPlan);
		next();
	});
	it('updateRecurringPlan', function (next) {
		assert.throw(api.updateRecurringPlan);
		next();
	});
	it('getPlan', function (next) {
		assert.throw(api.getPlan);
		next();
	});
/*	it('deletePlan', function (next) {
		assert.throw(api.deletePlan);
		next();
	});*/

	//credits, refunds and voids
	it('credit', function (next) {
		assert.throw(api.credit);
		next();
	});
	it('refund', function (next) {
		assert.throw(api.refund);
		next();
	});
	it('void', function (next) {
		assert.throw(api.void);
		next();
	});

	//transactions
	it('getTransactions', function (next) {
		assert.throw(api.getTransactions);
		next();
	});
	it('getTransaction', function (next) {
		assert.throw(api.getTransaction);
		next();
	});
	it('updateTransaction', function (next) {
		assert.throw(api.updateTransaction);
		next();
	});
});
