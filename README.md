securenet-js
==============

SecureNet [PayOS API](https://apidocs.securenet.com/docs/getstarted.html) community library for Node.js. All features and commands of the SecureNet PayOS API payment gateway are supported. [SecureNet](http://www.securenet.com/) is a [WorldPay](http://www.worldpay.com/us) company.

- Credit Card Present
- Credit Card Not Present
- ACH
- Settlement
- Credits
- Refunds
- Voids
- SecureNet Vault
- Recurring Billing
- Transaction Reporting and Management
- Tokenization
	- For unit testing purposes.
	- For browser tokenization see [PayOS.js](https://apidocs.securenet.com/docs/tokenization.html?lang=json).

## Installation

```bash
npm install securenet-js --save
```
## Features

The following features are supported:
- Multiple client instances.
- Can change mode between live and sandbox.
	- At initialization of the client.
	- On a client instance after initialization.
	- For a specific transaction and default back to previous mode.
- All PayOS API features and commands are supported.
- Fully unit tested.

## Usage

Initialize the payment gateway client:

```javascript

var config = {
	credentials: {
		secureNetId: ' your SecureNet Id ', //provided via signup email
		secureNetKey: ' your SecureNet secure Key ' //provided inside virtual terminal
	},
	developerApplication: {
		developerId: 12345678, // provided by SecureNet after certification
		version: '1.2'
	},
	mode: 'live' //live or test
};

var SecureNet = require('securenet');
var payos = new SecureNet(config);
```

See the unit tests for common application workflows.


## Unit Tests

We are using [Mocha](http://mochajs.org/) for unit testing.

The unit test spec requires you to set your api credentials as environment variables.

```bash
export SECURENET_ID=xxxx
export SECURENET_SECURE_KEY=yyyy
```

Install with npm:
```bash
$ npm install -g mocha
$ npm install -g chai
```

Run unit tests:
```bash
$ npm test
```

## Code Coverage
```bash
$ npm install istanbul -g
$ istanbul cover _mocha
```

## Code Quality
```bash
npm install -g eslint
eslint .
```

## People
The original author of securenet-node is [Richard Stanford](http://richardstanford.com/).

The current lead maintainer is [Dan Hollenbeck](https://github.com/dhollenbeck).

## LICENSE

[BSD-2-Clause](https://github.com/HOAThink/securenet-node/blob/master/LICENSE)