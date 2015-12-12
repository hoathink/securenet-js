securenet-node
==============

SecureNet PayOS API community library for Node.js. Please see the
[PayOS API docs](https://apidocs.securenet.com/docs/getstarted.html)
for help.


## Usage

```javascript
var credentials = {
	securenetId: ' your securenet id key ', //provided via signup email
	securenetKey: ' your securenet secure key ', //provided inside virtual terminal
	mode: 'live' // live or test
};

var SecureNet = require('securenet');
var payos = new SecureNet(credentials);
```

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
$ mocha
```
