const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config");
const { captureScreenshots } = require("./functions/screenshot");
const { collectRssFeeds } = require("./functions/rss-feeds");

require('./functions/init');

const dev = process.env.NODE_ENV !== "production";

//@ts-ignore
const app = next({
	dev,
	// the absolute directory from the package.json file that initialises this module
	// IE: the absolute path from the root of the Cloud Function
	conf: config,
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
	// log the page.js file or resource being requested
	console.log("File: " + request.originalUrl);
	response.set(
		'Cache-Control', 'public, max-age=600',
	);
	return app.prepare().then(() => handle(request, response));
});

exports.nextjs = { server };

exports.takeScreenshot = functions
	.runWith({
		timeoutSeconds: 300,
		memory: '2GB',
	})
	.https
	.onRequest(async (request, response) => {
		try {
			await captureScreenshots();
			response.send({
				ok: true,
			});
		} catch (err) {
			console.error(JSON.stringify(err));
			response.send({
				ok: false,
				err,
			});
		}
	});


exports.collectRssFeeds = functions
	.runWith({
		timeoutSeconds: 300,
	})
	.https
	.onRequest(async (request, response) => {
		try {
			await collectRssFeeds();
			response.send({
				ok: true,
			});
		} catch (err) {
			console.error(JSON.stringify(err));
			response.send({
				ok: false,
				err,
			});
		}
	});

exports.scheduledScreenshots = functions
	.runWith({
		timeoutSeconds: 300,
		memory: '2GB',
	})
	.pubsub
	.schedule('1 */8 * * *')
	.timeZone('America/Chicago')
	.onRun(captureScreenshots);

exports.scheduledRssFeeds = functions
	.runWith({
		timeoutSeconds: 300,
	})
	.pubsub
	.schedule('3 */8 * * *')
	.timeZone('America/Chicago')
	.onRun(collectRssFeeds);
