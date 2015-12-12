securenet-node
==============

SecureNet PayOS API community library for Node.js. Please see the
[PayOS API docs](https://apidocs.securenet.com/docs/getstarted.html)
for help.


## Usage

```javascript

var credentials = {
	securenetId: ' your securenet id key ', //provided via signup email
	securenetKey: ' your securenet secure key ' //provided inside virtual terminal
};
var developerApplication = {
	developerId: 12345678,
	Version: '1.2'
};
var config = {
	credentials: credentials,
	developerApplication: developerApplication,
	mode: 'live' //live or test
};

var SecureNet = require('securenet');
var payos = new SecureNet(config);
```

## Question

You can verify (confirm card details) via online card data. Can you do the same for tokenizaitoned or vaulted data?

Enable payment credits (FORCE_CREDIT) to allow checking of api client?
Enable payment ach to allow checking of api client?


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
$ mocha --recursive
```
## LICENSE

[BSD-2-Clause](https://github.com/HOAThink/securenet-node/blob/master/LICENSE)