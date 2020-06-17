const admin = require('firebase-admin');
const serviceAccount = require('./headline-archive-firebase-adminsdk-key.json');

admin.initializeApp({
	// @ts-ignore
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://headline-archive.firebaseio.com"
});
