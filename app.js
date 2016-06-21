'use strict';

let express = require('express');
let app = express();
let redis = require('redis').createClient();
let bodyParser = require('body-parser');
let timestamp = require('time-stamp');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	console.log(`[${timestamp('YYYY/MM/DD HH:mm:ss')}] ${req.method} ${req.path}`);
	next();
});

app.get('*', function(req, res) {
	redis.get(req.path, function(err, value) {
		res.send(`get ${value} from ${req.path}`);
	});
});

app.post('*', function(req, res) {
	redis.set(req.path, req.body.value, function(err, result) {
		if (!err) {
			res.send(`set ${req.body.value} to ${req.path}`);
		}
	});
});

module.exports = app;
