// @ts-check
const puppeteer = require('puppeteer-extra').default;
const stealth = require('puppeteer-extra-plugin-stealth');
const adBlock = require('puppeteer-extra-plugin-adblocker').default;
const anonymizeUa = require('puppeteer-extra-plugin-anonymize-ua');
const admin = require('firebase-admin');
const { sites } = require('./sites');
const { format } = require('date-fns');

exports.captureScreenshots =
async function captureScreenshots(request, response) {
	console.log('starting');

	puppeteer.use(stealth());
	puppeteer.use(adBlock());
	puppeteer.use(anonymizeUa());

	const dir = `screenshots/${format(new Date(), 'yyyy/MM/dd/HH')}`;
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
	});
	console.log('browser initialized');

	const page = await browser.newPage();

	await page.setRequestInterception(true);
	await page.setDefaultNavigationTimeout(10000);
	await page.setViewport({
		width: 432,
		height: 768,
		isMobile: true,
	});

	const bar = foo();

	page.on('request', bar.handler);

	// TODO Clean this mess up.
	const retries = [];

	for(const site of sites) {
		await processSite(site);
	}

	for(const site of sites) {
		await processSite(site, false);
	}

	console.log('generated screenshots');
	await browser.close();

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
				request.abort().catch(() => {});
			} else {
				request.continue().catch(() => {});
			}
		}

		return {
			setSite: newSite => site = newSite,
			handler: requestHandler,
		}
	}

	/**
	 * @typedef { import ("../interfaces").Site } Site
	 *
	 * @param { Site } [site]
	 * @param { boolean } [retry]
	*/
	async function processSite(site, retry = true) {

		try {
			bar.setSite(site);

			console.log(`${site.pageUrl} opening`);

			await page.goto(site.pageUrl, {
				waitUntil: "networkidle2",
			});
		
			console.log(`${site.pageUrl} opened`);
		
			// Disable service workers
			//@ts-ignore
			await page._client.send('ServiceWorker.enable');
			//@ts-ignore
			await page._client.send('ServiceWorker.stopAllWorkers');

			if(site.scrollTo) {
				console.log(`Scrolling to ${site.scrollTo}`);
				try {
					const targetElHandle = await page.$(site.scrollTo);

					await page.evaluate(targetEl => {
						targetEl && targetEl.scrollIntoView();
					}, targetElHandle);

					await targetElHandle.dispose();
				} catch(e) {
					console.error(`Error scrolling to ${site.scrollTo} on site ${site.pageUrl}`, e);
				}
				console.log(`Finished scrolling to ${site.scrollTo}`);
			}

			await page.waitFor(site.wait || 250);

			const imageBuffer = await page.screenshot();

			console.log(`Saving screenshot to ${dir}/${site.key}.png`)
			await saveScreenShot(`${dir}/${site.key}.png`, imageBuffer);
		} catch(e) {
			retry && retries.push(site);
			console.error(`Error capturing site "${site.label}"`, JSON.stringify(e));
		}
	}
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
