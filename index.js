'use strict';

module.exports = function(options) {


	var secureNet = {};
	var util = require('./lib/util').init(options);

	//expose properties (for unit tests)
	secureNet.mode = options.mode;
	secureNet.secureNetId = options.credentials.secureNetId;
	secureNet.secureNetKey = options.credentials.secureNetKey;

	////////////////////////////////////////////////////////////////////////////////
	// Config
	////////////////////////////////////////////////////////////////////////////////


	////////////////////////////////////////////////////////////////////////////////
	// Settlement
	////////////////////////////////////////////////////////////////////////////////

	secureNet.getBatch = function(batchId, callback) {
		if (!batchId) {
			util.get('batches/Current', null, callback);
		} else {
			util.get('batches/' + batchId, null, callback);
		}
	};

	secureNet.getCurrentBatch = function(callback) {
		secureNet.getBatch(null, callback);
	};

	secureNet.closeBatch = function(callback) {
		util.post('batches/Close', null, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Transaction Processing (card present & card not present)
	////////////////////////////////////////////////////////////////////////////////

	secureNet.authorize = function(data, callback) {
		util.post('/Payments/Authorize', data, callback);
	};

	secureNet.capture = function(data, callback) {
		util.post('/Payments/Capture', data, callback);
	};

	secureNet.charge = function(data, callback) {
		util.post('/Payments/Charge', data, callback);
	};

	secureNet.verify = function(data, callback) {
		util.post('/Payments/Verify', data, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Vault
	////////////////////////////////////////////////////////////////////////////////

	secureNet.createCustomer = function(data, callback) {
		util.post('/Customers', data, callback);
	};

	secureNet.getCustomer = function(data, callback) {

		//convenience
		if (typeof data !== 'object') data = {customerId: data};

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);

		util.get('/Customers/' + data.customerId, null, callback);
	};

	secureNet.updateCustomer = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);

		util.put('Customers/' + data.customerId, data, callback);
	};

	secureNet.createCustomerPaymentMethod = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);

		util.post('Customers/' + data.customerId + '/PaymentMethod', data, callback);
	};

	secureNet.getCustomerPaymentMethod = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.paymentMethodId) return util.error({ message: 'paymentMethodId is required' }, callback);

		util.get('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, null, callback);
	};

	secureNet.updateCustomerPaymentMethod = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.paymentMethodId) return util.error({ message: 'paymentMethodId is required' }, callback);

		util.put('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, data, callback);
	};

	secureNet.deleteCustomerPaymentMethod = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.paymentMethodId)  return util.error({ message: 'paymentMethodId is required' }, callback);

		util.delete('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, null, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// AutoBill Plans
	////////////////////////////////////////////////////////////////////////////////

	secureNet.createInstallmentPlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);

		util.post('Customers/' + data.customerId + '/PaymentSchedules/Installment', data, callback);
	};
	secureNet.updateInstallmentPlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.planId) return util.error({ message: 'planId is required' }, callback);

		util.put('Customers/' + data.customerId + '/PaymentSchedules/Installment/' + data.planId, data, callback);
	};

	secureNet.createVariablePlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);

		util.post('Customers/' + data.customerId + '/PaymentSchedules/Variable', data, callback);
	};
	secureNet.updateVariablePlan = function(data, callback) {

		//validate
		if (! data.customerId)  return util.error({ message: 'customerId is required' }, callback);
		if (! data.planId) return util.error({ message: 'planId is required' }, callback);

		util.put('Customers/' + data.customerId + '/PaymentSchedules/Variable/' + data.planId, data, callback);
	};

	secureNet.createRecurringPlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);

		util.post('Customers/' + data.customerId + '/PaymentSchedules/Recurring', data, callback);
	};
	secureNet.updateRecurringPlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.planId) return util.error({ message: 'planId is required' }, callback);

		util.put('Customers/' + data.customerId + '/PaymentSchedules/Recurring/' + data.planId, data, callback);
	};

	secureNet.getPlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.planId) return util.error({ message: 'planId is required' }, callback);

		util.get('Customers/' + data.customerId + '/PaymentSchedules/' + data.planId, null, callback);
	};

	secureNet.deletePlan = function(data, callback) {

		//validate
		if (! data.customerId) return util.error({ message: 'customerId is required' }, callback);
		if (! data.planId) return util.error({ message: 'planId is required' }, callback);

		util.delete('Customers/' + data.customerId + '/PaymentSchedules/' + data.planId, null, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Credits
	////////////////////////////////////////////////////////////////////////////////

	secureNet.credit = function(data, callback) {
		util.post('/Payments/Credit', data, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Refunds and Voids
	////////////////////////////////////////////////////////////////////////////////

	secureNet.refund = function(data, callback) {

		//convenience
		if (typeof data !== 'object') data = {transactionId: data};

		//validate
		if (! data.transactionId) return util.error({ message: 'transactionId is required' }, callback);

		util.post('/Payments/Refund', data, callback);
	};

	secureNet.void = function(data, callback) {

		//convenience
		if (typeof data !== 'object') data = {transactionId: data};

		//validate
		if (! data.transactionId) return util.error({ message: 'transactionId is required' }, callback);

		util.post('/Payments/Void', data, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Transactions
	////////////////////////////////////////////////////////////////////////////////

	secureNet.getTransactions = function(data, callback) {

		//validate
		if (typeof data === 'object') {
			util.post('/Transactions/Search', data, callback);
		} else {
			util.get('/Transactions/' + data, null, callback);
		}
	};

	secureNet.getTransaction = function(data, callback) {

		//convenience
		if (typeof data !== 'object') data = {transactionId: data};

		//validate
		if (! data.transactionId) return util.error({ message: 'transactionId is required' }, callback);

		util.get('/Transactions/' + data.transactionId, null, callback);
	};

	secureNet.updateTransaction = function(data, callback) {

		//validate
		if (! data.referenceTransactionId) return util.error({ message: 'referenceTransactionId is required' }, callback);

		util.put('/Transactions/' + data.referenceTransactionId, data, callback);
	};

	////////////////////////////////////////////////////////////////////////////////

	return secureNet;
}
