'use strict';

let app = require('./app');
let port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(`start at port: ${port}`);
});