module.exports = function(options) {

	// Public methods are at the bottom

	var secureNet = {};

	var util = require('./lib/util').init(options);

	//expose properties (for unit tests)
	secureNet.mode = options.mode;
	secureNet.securenetId = options.securenetId;
	secureNet.securenetKey = options.securenetKey;

	////////////////////////////////////////////////////////////////////////////////
	// Batch Processing
	////////////////////////////////////////////////////////////////////////////////

	secureNet.getBatch = function(batchId, callback) {
		if (!batchId) {
			util.get('batches/Current', null, callback);
		}
		util.get('batches/' + batchId, null, callback);
	};

	secureNet.getCurrentBatch = function(callback) {
		secureNet.getBatch(null, callback);
	};

	secureNet.closeBatch = function(callback) {
		util.post('batches/Close', null, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Transaction Processing
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

	////////////////////////////////////////////////////////////////////////////////
	// Vault
	////////////////////////////////////////////////////////////////////////////////

	secureNet.createCustomer = function(data, callback) {
		util.post('/Customers', data, callback);
	};

	secureNet.getCustomer = function(data, callback) {
		if (typeof data === 'object') {
			if (! data.customerId) {
				util.error({ message: 'customerId is required' }, callback);
				return;
			}
			util.get('/Customers/' + data.customerId, null, callback);
		} else {
			util.get('/Customers/' + data, null, callback);
		}
	};

	secureNet.updateCustomer = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		util.put('Customers/' + data.customerId, data, callback);
	};

	secureNet.createCustomerPaymentMethod = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		util.post('Customers/' + data.customerId + '/PaymentMethod', data, callback);
	};

	secureNet.getCustomerPaymentMethod = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		if (! data.paymentMethodId) {
			util.error({ message: 'paymentMethodId is required' }, callback);
			return;
		}
		util.get('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, null, callback);
	};

	secureNet.deleteCustomerPaymentMethod = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		if (! data.planId) {
			util.error({ message: 'paymentMethodId is required' }, callback);
			return;
		}
		util.delete('Customers/' + data.customerId + '/PaymentMethod/' + data.paymentMethodId, null, callback);
	};

	////////////////////////////////////////////////////////////////////////////////
	// Installment Plans
	////////////////////////////////////////////////////////////////////////////////

	secureNet.createInstallmentPlan = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		util.post('Customers/' + data.customerId + '/PaymentSchedules/Installment', data, callback);
	};

	secureNet.createVariablePlan = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		util.post('Customers/' + data.customerId + '/PaymentSchedules/Variable', data, callback);
	};

	secureNet.createRecurringPlan = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		util.post('Customers/' + data.customerId + '/PaymentSchedules/Recurring', data, callback);
	};

	secureNet.getPlan = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		if (! data.planId) {
			util.error({ message: 'planId is required' }, callback);
			return;
		}
		util.get('Customers/' + data.customerId + '/PaymentSchedules/' + data.planId, null, callback);
	};

	secureNet.deletePlan = function(data, callback) {
		if (! data.customerId) {
			util.error({ message: 'customerId is required' }, callback);
			return;
		}
		if (! data.planId) {
			util.error({ message: 'planId is required' }, callback);
			return;
		}
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
		if (typeof data === 'object') {
			util.post('/Payments/Refund', data, callback);
		} else {
			util.post('/Payments/Refund', { transactionId: data }, callback);
		}
	};

	secureNet.void = function(data, callback) {
		if (typeof data === 'object') {
			util.post('/Payments/Void', data, callback);
		} else {
			util.post('/Payments/Void', { transactionId: data }, callback);
		}
	};

	////////////////////////////////////////////////////////////////////////////////
	// Transactions
	////////////////////////////////////////////////////////////////////////////////

	secureNet.getTransactions = function(data, callback) {
		if (typeof data === 'object') {
			util.post('/Transactions/Search', data, callback);
		} else {
			util.get('/Transactions/' + data, null, callback);
		}
	};

	secureNet.getTransaction = function(data, callback) {
		if (typeof data === 'object') {
			if (! data.transactionId) {
				util.error({ message: 'transactionId is required' }, callback);
				return;
			}
			util.get('/Transactions/' + data.transactionId, null, callback);
		} else {
			util.get('/Transactions/' + data, null, callback);
		}
	};

	secureNet.updateTransaction = function(data, callback) {
		if (! data.referenceTransactionId) {
			util.error({ message: 'referenceTransactionId is required' }, callback);
			return;
		}
		util.put('/Transactions/' + data.referenceTransactionId, data, callback);
	};

	////////////////////////////////////////////////////////////////////////////////

	return secureNet;
}
