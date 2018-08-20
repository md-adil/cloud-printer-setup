const { exec } = require('child_process'),
	Shell = require('powershell'),
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
	const cmd = `Start-Process –FilePath "${filename}" –Verb Print -PassThru | %{sleep 20;$_} | kill`
	const ps = new Shell(cmd);
	ps.on('error', (err) => {
		console.log(err);
		rej(err);
	})
	ps.on('output', (m) => {
		console.log(m);
		res(m);
	})

	ps.on("error-output", err => {
	   console.error(err);
	   rej(err);
	});
});
