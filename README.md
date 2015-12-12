securenet-node
==============

SecureNet PayOS API community library for Node.js. Please see the
[PayOS API docs](https://apidocs.securenet.com/docs/getstarted.html)
for help.


## Usage

```javascript
var credentials = {
	securenetId: ' your securenet id key ', //provided via signup email
	secureKey: ' your securenet secure key ', //provided inside virtual terminal
	mode: 'live' // live or test
};

var SecureNet = require('securenet').init;
var payos = new SecureNet(credentials);
```


