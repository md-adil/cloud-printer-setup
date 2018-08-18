const { exec } = require('child_process'),
	os = require('os'),
	path = require('path');

const assetPath = path.join(__dirname, "..", "assets");

exports.install = () => {
	const base = path.dirname(process.execPath);

	switch(os.platform()) {
		case 'darwin':
			break;
		case 'win32':
		case 'win64':
			windowsService(base);
			break;
		default:
			// 
	}
}

const windowsService = (base) => new Promise((s, r) => {
	exec(assetPath + '/cloud-printer.exe', (err, m) => {
		if(err) {
			r(err);
		} else {
			s();
		}
	});
});
