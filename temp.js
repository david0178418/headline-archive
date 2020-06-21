const { captureScreenshots } = require('./functions/screenshot');

captureScreenshots()
	.then(e => console.log(111, e))
	.catch(e => console.log(222, e));
