const rl = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	}),
	config = require('./config'),
	setup = require('./setup'),
	server = require('./server'),
	path = require('path'),
	argv = require('minimist')(process.argv.slice(2));

switch(argv._[0]) {
	case 'server':
		server();
		break;
	default:
		setup();
}
