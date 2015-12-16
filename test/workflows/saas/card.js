'use strict';

var _ = require('lodash');
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var SecureNet = require('../../../index');
var example = require('../../support/data');
var api, token, customerId, paymentMethodId;

describe('Workflows - online SAAS application', function() {

	//set the timeout
	this.timeout(15000);

	beforeEach(function() {
		api = new SecureNet(example.config);
	});

	it('browser tokenization so the PCI data never touches your server', function(next) {

		//User-Agent:

		//var headers =
		var params = {
			publicKey: example.publicKey, //get this from virtual terminal
			card: example.card,
			addToVault: true
		};

		api._preVaultCard(params, function(err, res) {
			if (err) return next(err);

			console.log('res', res);

			/*{
				"token": "695c0f49-2a37-4ac6-8416-79fa429e3f26",
				"customerId": "181811",
				"success": true,
				"responseCode": 1,
				"message": "Approved",
				"responseDateTime": "2014-07-20T04:11:47.99Z"
			}*/

			//confirm response
			assert.typeOf(res, 'object');
			assert.ok(res.success);

			//setup for next test
			token = res.token;
			customerId = res.customerId;

			next();
		});
	});

});


