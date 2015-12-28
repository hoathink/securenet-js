'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, customerId, paymentMethodId;

describe('Payments transactions - vault', function() {

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

	it('createCustomerPaymentMethod card in vault', function(next) {

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
			assert.typeOf(res.vaultPaymentMethod, 'object');
			assert.equal(res.vaultPaymentMethod.method, 'CC');

			//setup for next test
			paymentMethodId = res.vaultPaymentMethod.paymentId; //note: this look like a API bug

			next();
		});
	});

	it('charge card stored in vault', function(next) {

		//setup
		var params = {
			amount: 11.00,
			paymentVaultToken: {
				customerId: customerId,
				paymentMethodId: paymentMethodId
			},
			//vaultCredentials:{
			//	secureNetId: api.secureNetId,
			//	secureNetKey: api.secureNetKey,
			//},
			extendedInformation: example.extendedInformation
		};

		api.charge(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ transaction:
   { secureNetId: 8005583,
	 transactionType: 'AUTH_CAPTURE',
	 customerId: '5000105',
	 orderId: 'AP80055831212151327482481',
	 transactionId: 114692099,
	 authorizationCode: 'EHIEMS',
	 authorizedAmount: 11,
	 allowedPartialCharges: false,
	 paymentTypeCode: 'VI',
	 paymentTypeResult: 'CREDIT_CARD',
	 level2Valid: false,
	 level3Valid: false,
	 transactionData: { date: Sat Dec 12 2015 12:27:49 GMT-0600 (CST), amount: 11 },
	 settlementData: null,
	 vaultData:
	  { token: [Object],
		company: '',
		firstName: null,
		lastName: null,
		email: '',
		phone: '' },
	 creditCardType: 'VISA',
	 cardNumber: 'XXXXXXXXXXXX 1111',
	 avsCode: 'M',
	 avsResult: 'MATCH',
	 cardHolder_FirstName: 'Jack',
	 cardHolder_LastName: 'Test',
	 expirationDate: '0416',
	 billAddress:
	  { line1: '123 Main St.',
		city: 'Austin',
		state: 'TX',
		zip: '78759',
		country: 'US',
		company: '',
		phone: '' },
	 email: '',
	 emailReceipt: false,
	 cardCodeCode: 'M',
	 cardCodeResult: 'MATCH',
	 accountName: null,
	 accountType: null,
	 accountNumber: null,
	 checkNumber: null,
	 traceNumber: null,
	 surchargeAmount: 0,
	 cashbackAmount: 0,
	 fnsNumber: null,
	 voucherNumber: null,
	 fleetCardInfo: null,
	 gratuity: 0,
	 industrySpecificData: 'P',
	 marketSpecificData: '',
	 networkCode: '',
	 additionalAmount: 0,
	 additionalData1: null,
	 additionalData2: null,
	 additionalData3: null,
	 additionalData4: '',
	 additionalData5: '',
	 method: 'CC',
	 responseText: 'Approved',
	 imageResult: null },
  success: true,
  result: 'APPROVED',
  responseCode: 1,
  message: 'SUCCESS',
  responseDateTime: Sat Dec 12 2015 12:27:48 GMT-0600 (CST),
  rawRequest: null,
  rawResponse: null,
  jsonRequest: null }*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			//assert.typeOf(res.customerId, 'string');

			//setup for next test
			//customerId = res.customerId;

			next();
		});
	});
});


