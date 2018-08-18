global.Promise = require('bluebird');

const os = require('os'),
	io = require('socket.io-client'),
	uuid = require('uuid/v1'),
	fs = require('fs'),
	path = require('path'),
	debug = require('debug')('app:server'),
	config = require('./config.js');

const host = `${config.host}/printer`;

const writeFile = Promise.promisify(fs.writeFile);

const socket = io(host, {
	query: { name: os.hostname() }
});

socket.on('connect', () => {
	debug('Connected to cloud');
});

socket.on('print', (data, obj) => {
	debug("Print command: ", obj.name);
	putFile(data, obj);
});

const putFile = async (data, obj) => {
	try {
		const filename = os.tmpdir() + '/' + uuid() + '.' + path.extname(obj.name);
		await writeFile(filename, data);
		await printer.print(filename);
	} catch(err) {
		debug(err);
	}
}

const removeFile = filename => {
	fs.unlink(filename, (err, res) => {
		debug('Deleted file: ', filename);
	});
}