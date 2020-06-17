const puppeteer = require('puppeteer');
const admin = require('firebase-admin');
const { sites } = require('./sites');
const { format } = require('date-fns');

exports.captureScreenshots =
async function captureScreenshots(request, response) {
	console.log('starting');

	const dir = `screenshots/${format(new Date(), 'yyyy/MM/dd/HH')}`;
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	console.log('browser initialized');

	const page = await browser.newPage();

	await page.setDefaultNavigationTimeout(0);
	await page.setViewport({width: 1024, height: 576});

	for(const site of sites) {
		try {
			await page.goto(site.pageUrl, {
				"waitUntil": "networkidle0",
			});
		
			console.log('page opened');
		
			// Disable service workers
			//@ts-ignore
			await page._client.send('ServiceWorker.enable');
			//@ts-ignore
			await page._client.send('ServiceWorker.stopAllWorkers');
			const imageBuffer = await page.screenshot();

			await saveScreenShot(`${dir}/${site.key}.png`, imageBuffer);
		} catch(e) {
			console.error(`Error capturing site "${site}"`);
		}
	}

	console.log('generated screenshot');
	await browser.close();
}

async function saveScreenShot(path, imageBuffer) {
	if (!imageBuffer || imageBuffer === '') {
		throw new Error('No screenshot');
	}


	// We get the instance of our default bucket
	const bucket = admin.storage().bucket();

	// Create a file object
	const file = bucket.file(path);

	// Save the image
	await file.save(imageBuffer);
}
