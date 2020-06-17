const admin = require('firebase-admin');
const serviceAccount = require('./headline-archive-firebase-adminsdk-key.json');

if(!admin.apps.length) {
	if(process.env.NODE_ENV === 'development') {
		admin.initializeApp({
			// @ts-ignore
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://headline-archive.firebaseio.com'
		});
	} else {
		admin.initializeApp();
	}
}

