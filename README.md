securenet-node
==============

SecureNet PayOS API community library for Node.js. Please see the
[PayOS API docs](https://apidocs.securenet.com/docs/getstarted.html)
for help.


## Usage

```javascript
var credentials = {
	securenetid: ' your securenet id key ', //provided via signup email
	securekey: ' your securenet secure key ' //provided inside virtual terminal
};

var SecureNet = require('securenet').init;
var securenet = new SecureNet(credentials);
```

