'use strict';

//var should = require('should');
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../example.data');
var api, customerId;

describe('Vault Customers', function() {

	//set the timeout
	this.timeout(15000);

	beforeEach(function() {
		api = new SecureNet(example.config);
	});

	it('create', function(next) {
		api.createCustomer(example.customer, function(err, res) {
			if (err) return next(err);

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.typeOf(res.customerId, 'string');

			//setup for next test
			customerId = res.customerId;

			next();
		});
	});

	it('retrieve', function(next) {
		api.getCustomer(customerId, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{
				"vaultCustomer": {
					"customerId": "5000039",
					"address": {
						"line1": "123 Main St.",
						"city": "Austin",
						"state": "TX",
						"zip": "78759",
						"country": "US",
						"company": null,
						"phone": "512-122-1211"
					},
					"firstName": "Test",
					"lastName": "Tester",
					"phoneNumber": "512-122-1211",
					"emailAddress": "some@emailaddress.com",
					"sendEmailReceipts": true,
					"company": "Test company",
					"notes": "This is test notes",
					"userDefinedFields": [{
						"udfName": "UDF1",
						"udfValue": "udf1_value"
					}, {
						"udfName": "UDF2",
						"udfValue": "udf2_value"
					}, {
						"udfName": "UDF3",
						"udfValue": "udf3_value"
					}, {
						"udfName": "UDF4",
						"udfValue": "udf4_value"
					}],
					"paymentMethods": [],
					"primaryPaymentMethodId": null,
					"variablePaymentPlans": [],
					"recurringPaymentPlans": [],
					"installmentPaymentPlans": []
				},
				"customerId": "5000039",
				"success": true,
				"result": "APPROVED",
				"responseCode": 1,
				"message": "SUCCESS",
				"responseDateTime": "2015-12-12T12:27:03.38Z",
				"rawRequest": null,
				"rawResponse": null,
				"jsonRequest": null
			}*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.equal(customerId, res.customerId);
			assert.typeOf(res.vaultCustomer, 'object');

			//setup for next test

			next();
		});
	});
});