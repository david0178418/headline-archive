const puppeteer = require('puppeteer');
const admin = require('firebase-admin');

exports.takeScreenShotOnRequest =
async function takeScreenShotOnRequest(request, response) {
	console.log('starting');
	try {
		const imageBuffer = await generateScreenShot();
		console.log('generated screenshot');
		await saveScreenShot(imageBuffer);
		console.log('saved screenshot');
		response.send({
			ok: true,
		});
	} catch (err) {
		console.error(err);
		response.send({
			ok: false,
		});
	}
}

async function generateScreenShot() {
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	console.log('browser initialized');

	const page = await browser.newPage();

	await page.setDefaultNavigationTimeout(0);
	// Screenshot size
	await page.setViewport({width: 1024, height: 576});

	// Go to your website
	await page.goto('https://cnn.com', {
		"waitUntil": "networkidle0",
	});

	console.log('page opened');

	// Disable service workers
	//@ts-ignore
	await page._client.send('ServiceWorker.enable');
	//@ts-ignore
	await page._client.send('ServiceWorker.stopAllWorkers');

	// Take the screenshot
	const imageBuffer = await page.screenshot();
	console.log('image captured');

	await browser.close();

	return imageBuffer;
}

async function saveScreenShot(imageBuffer) {
	if (!imageBuffer || imageBuffer === '') {
		throw new Error('No screenshot');
	}

	// We get the instance of our default bucket
	const bucket = admin.storage().bucket();

	// Create a file object
	const file = bucket.file(`screenshots/deckdeckgo.png`);

	// Save the image
	await file.save(imageBuffer);
}
