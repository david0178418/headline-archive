import admin from 'firebase-admin';
import serviceAccount from './headline-archive-firebase-adminsdk-key.json';

admin.initializeApp({
	// @ts-ignore
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://headline-archive.firebaseio.com"
});
