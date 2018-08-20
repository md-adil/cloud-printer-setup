global.Promise = require('bluebird');

const os = require('os'),
	io = require('socket.io-client'),
	uuid = require('uuid/v1'),
	fs = require('fs'),
	path = require('path'),
	debug = require('debug')('app:server'),
	writeFile = Promise.promisify(fs.writeFile),
	printer = require('./printer'),
	config = require('./config.js');

module.exports = () => {
	console.log('Conencting');
	const host = `${config.host}/printers`;
	console.log(host);
	const socket = io(host, {
		query: { name: os.hostname() }
	});
	listenForEvents(socket);
}

const listenForEvents = (socket) => {
	socket.on('connect', () => {
		console.log('Connected to cloud');
	});

	socket.on('print', (data, obj) => {
		console.log("Print command", obj.name);
		putFile(data, obj);
	});

	socket.on('error', (err) => {
		console.error(err);
	});
}


const putFile = async (data, obj) => {
	try {
		const filename = path.join(os.tmpdir(), uuid()) + path.extname(obj.name);
		await writeFile(filename, data);
		await printer.print(filename);
	} catch(err) {
		console.error(err);
	}
}

const removeFile = filename => {
	fs.unlink(filename, (err, res) => {
		debug('Deleted file: ', filename);
	});
}