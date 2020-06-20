import admin from 'firebase-admin';
import { sites } from './sites';
import { Feed } from '../interfaces';
import './init'

const {
	firestore,
} = admin;

export
async function getProps(cutOffDateIso = new Date().toISOString()) {
	const f = firestore();
	const feeds: Feed[] = [];
	for(const site of sites) {
		(
			await f.collection('feeds')
				.where('key', '==', site.key)
				.where('date', '<', cutOffDateIso)
				.orderBy('date', 'desc')
				.limit(1)
				.get()
		).forEach(doc => {
			const data: any = doc.data();

			if(data.feed) {
				data.feed.items = data.feed.items.slice(0, 5);
			}

			feeds.push(data);
		});
	}

	return feeds;
}
