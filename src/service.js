const { exec } = require('child_process'),
	os = require('os'),
	path = require('path');

exports.install = () => {
	const base = path.dirname(process.execPath);
	switch(os.platform()) {
		case 'darwin':
			break;
		case 'win32':
			return windowsService(base);
			break;
		default:
			// 
	}
}

const windowsService = (base) => new Promise((s, r) => {
	exec(path.join('assets', 'cloud-printer.exe') + ' install', (err, m) => {
		if(err) {
			r(err);
		} else {
			s();
		}
	});
});
