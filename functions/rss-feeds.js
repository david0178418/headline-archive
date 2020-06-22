// @ts-check
const Parser = require('rss-parser');
const { sites } = require('./sites');
const { firestore } = require('firebase-admin');
const { format } = require('date-fns');

exports.collectRssFeeds =
async function collectRssFeeds() {
	const date = new Date();
	const parser = new Parser();
	const screenDir = format(date, 'yyyy/MM/dd/HH');
	const f = firestore();

	const batch = f.batch();

	console.log('Starting feed collection...');
	const feedRef = f.collection('feeds');
	for(const site of sites) {
		try {
			const feed = site.feedUrl ?
				await parser.parseURL(site.feedUrl):
				null;

			batch.create(feedRef.doc(), {
				...site,
				date: date.toISOString(),
				screenDir,
				feed: JSON.parse(JSON.stringify(feed)),
			});
		} catch(e) {
			console.error(`Failed to gather feed "${site.key}"`, e);
		}
	}

	console.log('Saving feeds...');

	try {
		await batch.commit();
	} catch(e) {
		console.error('Failed to write feeds', e);
	}
}
