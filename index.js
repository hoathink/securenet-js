'use strict';

var Util = require('./lib/util');
var Assert = require('assert');
var isFinite = require('lodash.isfinite');
var isFunction = require('lodash.isfunction');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');
var isUndefined = require('lodash.isundefined');
var message = 'Tokenization of card or check is a browser feature and is only implemented here for unit testing. If you want to tokenize on the server use vault methods.';

function isInteger (x){
	if (isString(x)) x = parseInt(x);
	return (isFinite(x));
}

module.exports = function(options) {

	var secureNet = {};
	var util = new Util(options);

	////////////////////////////////////////////////////////////////////////////////
	// Config
	////////////////////////////////////////////////////////////////////////////////

	secureNet.setMode = function(mode){
		util.mode(mode);
	};

	secureNet.getMode = function(){
		return util.mode();
	};

	secureNet.getBaseUrl = function(){
		return util.baseUrl();
	};

	////////////////////////////////////////////////////////////////////////////////
	// Tokenization (for unit testing, use PayOS.js in production)
	////////////////////////////////////////////////////////////////////////////////

	secureNet.tokenize = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(this.getMode() === 'test', message);

		var partialUrl = (data.card)? '/PreVault/Card' : '/PreVault/Check';

		util.browserTokenization(partialUrl, data, next);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Transaction Processing (card present & card not present)
	////////////////////////////////////////////////////////////////////////////////

	secureNet.authorize = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('/Payments/Authorize', data, next);
	};

	secureNet.capture = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('/Payments/Capture', data, next);
	};

	secureNet.charge = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('/Payments/Charge', data, next);
	};

	secureNet.verify = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('/Payments/Verify', data, next);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Vault
	////////////////////////////////////////////////////////////////////////////////

	secureNet.createCustomer = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('/Customers', data, next);
	};

	secureNet.getCustomer = function(data, next) {

		//convenience
		if (!isObject(data)) data = {customerId: data};

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `customerId` or `data.customerId` must be an integer.');

		util.get('/Customers/' + data.customerId, null, next);
	};

	secureNet.updateCustomer = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');

		util.put('Customers/' + data.customerId, data, next);
	};

	secureNet.createCustomerPaymentMethod = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');

		util.post('Customers/' + data.customerId + '/PaymentMethod', data, next);
	};

	secureNet.getCustomerPaymentMethod = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isString(data.paymentMethodId) || isInteger(data.paymentMethodId), 'param `data.paymentMethodId` must be an integer or vault token.');

		util.get('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, null, next);
	};

	secureNet.updateCustomerPaymentMethod = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.paymentMethodId) || isInteger(data.paymentMethodId), 'param `data.paymentMethodId` must be an integer or vault token.');

		util.put('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, data, next);
	};

	secureNet.deleteCustomerPaymentMethod = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.paymentMethodId) || isInteger(data.paymentMethodId), 'param `data.paymentMethodId` must be an integer or vault token.');

		util.delete('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, null, next);
	};

	////////////////////////////////////////////////////////////////////////////////
	// AutoBill Plans
	////////////////////////////////////////////////////////////////////////////////

	secureNet.createInstallmentPlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');

		util.post('Customers/' + data.customerId + '/PaymentSchedules/Installment', data, next);
	};
	secureNet.updateInstallmentPlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.planId), 'param `data.planId` must be an integer.');

		util.put('Customers/' + data.customerId + '/PaymentSchedules/Installment/' + data.planId, data, next);
	};

	secureNet.createVariablePlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');

		util.post('Customers/' + data.customerId + '/PaymentSchedules/Variable', data, next);
	};
	secureNet.updateVariablePlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.planId), 'param `data.planId` must be an integer.');

		util.put('Customers/' + data.customerId + '/PaymentSchedules/Variable/' + data.planId, data, next);
	};

	secureNet.createRecurringPlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');

		util.post('Customers/' + data.customerId + '/PaymentSchedules/Recurring', data, next);
	};
	secureNet.updateRecurringPlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.planId), 'param `data.planId` must be an integer.');

		util.put('Customers/' + data.customerId + '/PaymentSchedules/Recurring/' + data.planId, data, next);
	};

	secureNet.getPlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.planId), 'param `data.planId` must be an integer.');

		util.get('Customers/' + data.customerId + '/PaymentSchedules/' + data.planId, null, next);
	};

/*	secureNet.deletePlan = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.customerId), 'param `data.customerId` must be an integer.');
		Assert.ok(isInteger(data.planId), 'param `data.planId` must be an integer.');

		util.delete('Customers/' + data.customerId + '/PaymentSchedules/' + data.planId, null, next);
	};*/

	////////////////////////////////////////////////////////////////////////////////
	// Credits, Refunds and Voids
	////////////////////////////////////////////////////////////////////////////////

	secureNet.credit = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('/Payments/Credit', data, next);
	};

	secureNet.refund = function(data, next) {

		//convenience
		if (!isObject(data)) data = {transactionId: data};

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.transactionId), 'param `data.transactionId` must be an integer.');

		util.post('/Payments/Refund', data, next);
	};

	secureNet.void = function(data, next) {

		//convenience
		if (!isObject(data)) data = {transactionId: data};

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.transactionId), 'param `data.transactionId` must be an integer.');

		util.post('/Payments/Void', data, next);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Transactions
	////////////////////////////////////////////////////////////////////////////////

	secureNet.getTransactions = function(data, next) {

		//validate
		Assert.ok(isObject(data) || isString(data), 'param `data` must be an object or string.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		//validate
		if (isObject(data)) {
			util.post('/Transactions/Search', data, next);
		} else {
			util.get('/Transactions/' + data, null, next);
		}
	};

	secureNet.getTransaction = function(data, next) {

		//convenience
		if (!isObject(data)) data = {transactionId: data};

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.transactionId), 'param `data.transactionId` must be an integer.');

		util.get('/Transactions/' + data.transactionId, null, next);
	};

	secureNet.updateTransaction = function(data, next) {

		//validate
		Assert.ok(isObject(data), 'param `data` must be an object.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');
		Assert.ok(isInteger(data.referenceTransactionId), 'param `data.referenceTransactionId` must be an integer.');

		util.put('/Transactions/' + data.referenceTransactionId, data, next);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Settlement
	////////////////////////////////////////////////////////////////////////////////

	secureNet.getBatch = function(batchId, next) {

		//validate
		Assert.ok(isInteger(batchId) || isUndefined(batchId), 'param `batchId` must be an integer or undefined.');
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		if (!batchId) {
			util.get('batches/Current', null, next);
		} else {
			util.get('batches/' + batchId, null, next);
		}
	};

	secureNet.getCurrentBatch = function(next) {

		//validate
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		secureNet.getBatch(null, next);
	};

	secureNet.closeBatch = function(next) {

		//validate
		Assert.ok(isFunction(next), 'param `next` must be a next ');

		util.post('batches/Close', null, next);
	};

	return secureNet;
};
