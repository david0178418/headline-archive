import admin from 'firebase-admin';
import { sites } from './sites';
import { Feed } from '../interfaces';
import './init'

const {
	firestore,
} = admin;


export
async function getProps(cutOffDate = new Date()) {
	const f = firestore();
	const feeds: Feed[] = [];
	const cutOff = cutOffDate.toISOString();

	for(const site of sites) {
		(
			await f.collection('feeds')
				.where('key', '==', site.key)
				.where('date', '<', cutOff)
				.orderBy('date', 'desc')
				.limit(1)
				.get()
		).forEach(doc => {
			const data: any = doc.data();
			data.feed.items = data.feed.items.slice(0, 10)

			feeds.push(data);
		});
	}

	return feeds;
}
