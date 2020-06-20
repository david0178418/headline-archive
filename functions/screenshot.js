// @ts-check
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

	await page.setRequestInterception(true);
	await page.setDefaultNavigationTimeout(0);
	await page.setViewport({
		width: 576,
		height: 1024,
	});

	function foo() {
		/**
		 * @typedef { import ("../interfaces").Site } Site
		 *
		 * @type { Site | null }
		 */
		let site = null;

		/**
		 * @typedef { import ("puppeteer").Request } Request
		 *
		 * @param { Request } [request]
		*/
		function requestHandler(request) {
			if(request.resourceType() === 'script' && site && !site.enableJs) {
				request.abort();
			} else {
				request.continue();
			}
		}

		return {
			setSite: newSite => site = newSite,
			handler: requestHandler,
		}
	}

	const bar = foo();

	page.on('request', bar.handler);

	for(const site of sites) {
		try {
			bar.setSite(site);

			await page.goto(site.pageUrl, {
				"waitUntil": "networkidle0",
			});
		
			console.log('page opened');
		
			// Disable service workers
			//@ts-ignore
			await page._client.send('ServiceWorker.enable');
			//@ts-ignore
			await page._client.send('ServiceWorker.stopAllWorkers');

			if(site.scrollTo) {
				console.log(`Scrolling to ${site.scrollTo}`);
				try {
					await page.evaluate(() => {
						const targetEl = document.querySelector(site.scrollTo);
	
						if(targetEl) {
							console.log(`Element ${site.scrollTo} found`);
							targetEl.scrollIntoView();
							console.log(`Finished scrolling to ${site.scrollTo}`);
						} else {
							console.error(`Could not find element ${site.scrollTo}`);
						}
					});
				} catch(e) {
					console.error(`Error scrolling to ${site.scrollTo} on site ${site.label}`);
				}
				console.log(`Finished scrolling to ${site.scrollTo}`);
			}

			const imageBuffer = await page.screenshot();

			await saveScreenShot(`${dir}/${site.key}.png`, imageBuffer);
		} catch(e) {
			console.error(`Error capturing site "${site.label}"`, JSON.stringify(e));
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
