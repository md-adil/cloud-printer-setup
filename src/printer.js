const { exec } = require('child_process'),
	os = require('os');

exports.print = (filename) => {
	switch(os.platform()) {
		case 'darwin':
			break;
		case 'win32':
			printOnWindows(filename);
			break;
		default:
			break;
	}
}

const printOnWindows = (filename) => new Promise((res, rej) => {
	exec(`print "${filename}"`, (err, data) => {
		if(err) {
			rej(err);
		} else {
			res(filename);
		}
	});
});
