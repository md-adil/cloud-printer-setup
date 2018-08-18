const io = require('socket.io-client'),
	config = require('./config'),
	Spinner = require('cli-spinner').Spinner,
	service = require('./service'),
	{ exec } = require('child_process');

module.exports = async () => {
	// const socket = io(`${ config.host }/setup`);
	const serviceLoader = new Spinner("Installing service...");
	serviceLoader.start();
	await service.install();
	serviceLoader.stop();
	console.log('Service has been installed successfully.');
	console.log('Close the window');
}
