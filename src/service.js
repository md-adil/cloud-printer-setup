const { exec } = require('child_process'),
	os = require('os'),
	path = require('path');

const assetPath = path.join(__dirname, "..", "asset");

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
	const option = {
		env: { APP_PATH: base }
	};
	exec('assets/cloud-printer.exe install', option, (err, m) => {
		if(err) {
			r(err);
		} else {
			s();
		}
	});
});
