securenet-node
==============

SecureNet [PayOS API](https://apidocs.securenet.com/docs/getstarted.html) community library for Node.js. All features and commands of the SecureNet PayOS payment gateway are supported.

- Credit Card Present
- Credit Card Not Present
- ACH
- Settlement
- Credits
- Refunds
- Voids
- Tokenization (only for unit testing workflows, use PayOS.js in production)
- SecureNet Vault
- Recurring Billing
- Transaction Reporting and Management

## Installation

```bash
npm install securenet --save
```


## Usage

```javascript

var credentials = {
	secureNetId: ' your SecureNet Id ', //provided via signup email
	secureNetKey: ' your SecureNet secure Key ' //provided inside virtual terminal
};
var developerApplication = {
	developerId: 12345678,
	version: '1.2'
};
var config = {
	credentials: credentials,
	developerApplication: developerApplication,
	mode: 'live' //live or test
};

var SecureNet = require('securenet');
var payos = new SecureNet(config);
```

## Features

The following features are supported:
- Multiple client instances.
- Can change mode between live (`live`) and sandbox (`test`).
	- At initialization of the client.
	- On a client instance after initialization.
	- On a specific transaction.
- All PayOS API commands are supported.
- Fully unit tested.

## Unit Tests

We are using [Mocha](http://mochajs.org/) for unit testing.

The unit test spec requires you to set your api credentials as environment variables.

```bash
export SECURENET_ID=xxxx
export SECURENET_KEY=yyyy
```

Install with npm:
```bash
$ npm install -g mocha
$ npm install -g should
```

Run unit tests:
```bash
$ npm test
```

## Code Coverage
```bash
npm install -g istanbul
istanbul cover _mocha -- -R spec
open coverage/lcov-report/index.html
```


## People
The original author of securenet-node is [Richard Stanford](http://richardstanford.com/).

The current lead maintainer is [Dan Hollenbeck](https://github.com/dhollenbeck).

## LICENSE

[BSD-2-Clause](https://github.com/HOAThink/securenet-node/blob/master/LICENSE)