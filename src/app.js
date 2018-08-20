const rl = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	}),
	config = require('./config'),
	setup = require('./setup'),
	server = require('./server'),
	path = require('path'),
	argv = require('minimist')(process.argv.slice(2));
	
server();

// switch((argv._[0] || '').toLowerCase()) {
// 	case 'server':
// 		server();
// 		break;
// 	default:
// 		setup();
// }
