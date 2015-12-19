'use strict';

var clone = require('lodash.clone');
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, customerId, paymentMethodId;

describe('Vault - card data', function() {

	//set the timeout
	this.timeout(15000);

	before(function() {
		api = new SecureNet(example.config);
	});

	it('createCustomer', function(next) {
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

	it('retrieveCustomer', function(next) {
		api.getCustomer(customerId, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.equal(customerId, res.customerId);
			assert.typeOf(res.vaultCustomer, 'object');

			//setup for next test

			next();
		});
	});

	it('updateCustomer', function(next) {

		//setup
		var customer = clone(example.customer, true);
		customer.customerId = customerId;
		customer.firstName = 'Dan';
		customer.lastName = 'Hollenbeck';

		api.updateCustomer(customer, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.equal(customerId, res.customerId);
			assert.typeOf(res.vaultCustomer, 'object');

			//setup for next test

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

			/*
{ vaultPaymentMethod:
   { customerId: '5000062',
     paymentId: '1',
     card:
      { lastFourDigits: '1111',
        maskedNumber: 'XXXXXXXXXXXX 1111',
        expirationDate: '04/2016',
        creditCardType: 'VISA',
        address: [Object],
        firstName: 'Jack',
        lastName: 'Test',
        email: '',
        company: null },
     check: null,
     notes: '',
     method: 'CC',
     primary: true,
     lastAccessDate: null,
     userDefinedFields: [ [Object], [Object], [Object], [Object] ] },
  success: true,
  result: 'APPROVED',
  responseCode: 1,
  message: 'New Account Added.',
  responseDateTime: Sat Dec 12 2015 07:15:02 GMT-0600 (CST),
  rawRequest: null,
  rawResponse: null,
  jsonRequest: null }
  */

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

	it('getCustomerPaymentMethod', function(next) {

		//setup
		var params = {
			customerId: customerId,
			paymentMethodId: paymentMethodId
		};

		//make customer change
		api.getCustomerPaymentMethod(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ vaultPaymentMethod:
   { customerId: '5000069',
     paymentId: '1',
     card:
      { lastFourDigits: '1111',
        maskedNumber: 'XXXXXXXXXXXX 1111',
        expirationDate: '04/2016',
        creditCardType: 'VISA',
        address: [Object],
        firstName: 'Jack',
        lastName: 'Test',
        email: '',
        company: null },
     check: null,
     notes: '',
     method: 'CC',
     primary: true,
     lastAccessDate: null,
     userDefinedFields: [ [Object], [Object], [Object], [Object] ] },
  success: true,
  result: 'APPROVED',
  responseCode: 1,
  message: 'SUCCESS',
  responseDateTime: Sat Dec 12 2015 07:24:24 GMT-0600 (CST),
  rawRequest: null,
  rawResponse: null,
  jsonRequest: null }*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			//paymentId = res.vaultPaymentMethod.paymentId;

			next();
		});
	});

	it('updateCustomerPaymentMethod', function(next) {

		//setup
		var params = {
			customerId: customerId,
			paymentMethodId: paymentMethodId,
			card: clone(example.card),
			phone: '512-250-7865',
			notes: 'Create a vault account',
			primary: true,
			userDefinedFields: example.userDefinedFields
		};

		//make customer change
		api.updateCustomerPaymentMethod(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ vaultPaymentMethod:
   { customerId: '5000072',
     paymentId: '1',
     card:
      { lastFourDigits: '1111',
        maskedNumber: 'XXXXXXXXXXXX 1111',
        expirationDate: '04/2016',
        creditCardType: 'VISA',
        address: [Object],
        firstName: 'Jack',
        lastName: 'Test',
        email: '',
        company: null },
     check: null,
     notes: '',
     method: 'CC',
     primary: true,
     lastAccessDate: null,
     userDefinedFields: [ [Object], [Object], [Object], [Object] ] },
  success: true,
  result: 'APPROVED',
  responseCode: 1,
  message: 'Account is Updated',
  responseDateTime: Sat Dec 12 2015 07:40:53 GMT-0600 (CST),
  rawRequest: null,
  rawResponse: null,
  jsonRequest: null }*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.typeOf(res.vaultPaymentMethod, 'object');
			assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			//paymentId = res.vaultPaymentMethod.paymentId;

			next();
		});
	});

	it('deleteCustomerPaymentMethod', function(next) {

		//setup
		var params = {
			customerId: customerId,
			paymentMethodId: paymentMethodId
		};

		//call api
		api.deleteCustomerPaymentMethod(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ success: true,
  result: 'APPROVED',
  responseCode: 1,
  message: 'SUCCESS',
  responseDateTime: Sat Dec 12 2015 08:09:20 GMT-0600 (CST),
  rawRequest: null,
  rawResponse: null,
  jsonRequest: null }*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.vaultPaymentMethod, 'object');
			//assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			//paymentId = res.vaultPaymentMethod.paymentId;

			next();
		});
	});
});


