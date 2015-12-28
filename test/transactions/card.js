'use strict';

var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../index');
var example = require('../support/data');
var api, transactionId;

describe('Payments transactions - card', function() {

	//set the timeout
	this.timeout(15000);

	before(function() {
		api = new SecureNet(example.config);
	});

	it('authorize using card data', function(next) {

		//setup
		var params = {
			amount: 11.00,
			card: example.card,
			extendedInformation: example.extendedInformation
		};
		api.authorize(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ transaction:
   { secureNetId: 8005583,
	 transactionType: 'AUTH',
	 customerId: '',
	 orderId: 'AP80055831212151215335933',
	 transactionId: 114692070,
	 authorizationCode: '2G2T/F',
	 authorizedAmount: 11,
	 allowedPartialCharges: false,
	 paymentTypeCode: 'VI',
	 paymentTypeResult: 'CREDIT_CARD',
	 level2Valid: false,
	 level3Valid: false,
	 transactionData: { date: Sat Dec 12 2015 11:15:34 GMT-0600 (CST), amount: 11 },
	 settlementData: null,
	 vaultData: null,
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
  responseDateTime: Sat Dec 12 2015 11:15:33 GMT-0600 (CST),
  rawRequest: null,
  rawResponse: null,
  jsonRequest: null }*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);
			assert.isNumber(res.transaction.transactionId);

			//setup for next test
			transactionId = res.transaction.transactionId;

			next();
		});
	});


	it('capture using card data', function(next) {

		//setup
		var params = {
			amount: 11.00,
			transactionId: transactionId,
			card: example.card,
			extendedInformation: example.extendedInformation
		};
		api.capture(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ transaction:
   { secureNetId: 8005583,
	 transactionType: 'AUTH',
	 customerId: '',
	 orderId: 'AP80055831212151221004904',
	 transactionId: 114692072,
	 authorizationCode: 'VFEFEJ',
	 authorizedAmount: 11,
	 allowedPartialCharges: false,
	 paymentTypeCode: 'VI',
	 paymentTypeResult: 'CREDIT_CARD',
	 level2Valid: false,
	 level3Valid: false,
	 transactionData: { date: Sat Dec 12 2015 11:21:01 GMT-0600 (CST), amount: 11 },
	 settlementData: null,
	 vaultData: null,
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
  responseDateTime: Sat Dec 12 2015 11:21:00 GMT-0600 (CST),
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

	it('charge using card data', function(next) {

		//setup
		var params = {
			amount: 11.00,
			card: example.card,
			extendedInformation: example.extendedInformation
		};
		api.charge(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ transaction:
   { secureNetId: 8005583,
	 transactionType: 'AUTH_CAPTURE',
	 customerId: '',
	 orderId: 'AP80055831212151304548202',
	 transactionId: 114692079,
	 authorizationCode: 'S/P2CT',
	 authorizedAmount: 11,
	 allowedPartialCharges: false,
	 paymentTypeCode: 'VI',
	 paymentTypeResult: 'CREDIT_CARD',
	 level2Valid: false,
	 level3Valid: false,
	 transactionData: { date: Sat Dec 12 2015 12:04:55 GMT-0600 (CST), amount: 11 },
	 settlementData: null,
	 vaultData: null,
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
  responseDateTime: Sat Dec 12 2015 12:04:54 GMT-0600 (CST),
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

	it('verify using card data', function(next) {

		//setup
		var params = {
			amount: 0.0,
			card: example.card,
			extendedInformation: example.extendedInformation
		};
		api.verify(params, function(err, res) {
			if (err) return next(err);

			//console.log('res', res);

			/*{ transaction:
   { secureNetId: 8005583,
	 transactionType: 'VERIFICATION',
	 customerId: '',
	 orderId: 'AP80055831212151312322769',
	 transactionId: 114692086,
	 authorizationCode: 'YQWL+R',
	 authorizedAmount: 0,
	 allowedPartialCharges: false,
	 paymentTypeCode: 'VI',
	 paymentTypeResult: 'CREDIT_CARD',
	 level2Valid: false,
	 level3Valid: false,
	 transactionData: { date: Sat Dec 12 2015 12:12:32 GMT-0600 (CST), amount: 0 },
	 settlementData: null,
	 vaultData: null,
	 creditCardType: 'VISA',
	 cardNumber: 'XXXXXXXXXXXX 1111',
	 avsCode: 'Y',
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
	 industrySpecificData: '0',
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
  responseDateTime: Sat Dec 12 2015 12:12:32 GMT-0600 (CST),
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


