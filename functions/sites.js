// @ts-check
/**
 * @typedef { import ("../interfaces").Site } Site
 *
 * @type { Site[] }
 */
exports.sites = [{
	key: 'cnbc',
	label: 'CNBC',
	pageUrl: 'https://www.cnbc.com/',
	feedUrl: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',

}, {
	key: 'cnn',
	label: 'CNN',
	enableJs: true,
	pageUrl: 'https://cnn.com',
	feedUrl: 'http://rss.cnn.com/rss/cnn_topstories.rss',
}, {
	key: 'foxnews',
	label: 'Fox News',
	pageUrl: 'https://www.foxnews.com/',
	feedUrl: 'http://feeds.foxnews.com/foxnews/latest',
}, {
	key: 'msnbc',
	label: 'MSNBC',
	pageUrl: 'https://www.msnbc.com/',
	feedUrl: 'http://www.msnbc.com/feeds/latest',
	enableJs: true,
}, {
	key: 'huffpost',
	label: 'HuffPost',
	pageUrl: 'https://www.huffpost.com/',
	feedUrl: 'https://www.huffpost.com/section/us-news/feed',
}, {
	key: 'nytimes',
	label: 'New York Times',
	scrollTo: '.NYTAppHideMasthead',
	pageUrl: 'https://www.nytimes.com/',
	feedUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
}, {
	key: 'nypost',
	label: 'New York Post',
	pageUrl: 'https://nypost.com/',
	feedUrl: 'https://nypost.com/news/feed/',
}, {
	key: 'drudgereport',
	label: 'Drudge Report',
	pageUrl: 'https://drudgereport.com/',
	feedUrl: 'https://feedpress.me/drudgereportfeed',
}, {
	key: 'reddit',
	label: 'Reddit',
	pageUrl: 'https://www.reddit.com/',
	feedUrl: 'https://www.reddit.com/.rss',
}, {
	key: 'google-news',
	label: 'Google News',
	pageUrl: 'https://news.google.com',
	feedUrl: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
}, {
	key: 'marketwatch',
	label: 'MarketWatch',
	enableJs: true,
	pageUrl: 'https://www.marketwatch.com',
	feedUrl: 'http://www.marketwatch.com/rss/topstories',
}, {
	key: 'msn',
	label: 'MSN',
	enableJs: true,
	pageUrl: 'https://www.msn.com/',
	feedUrl: 'https://rss.msn.com/',
}, {
	key: 'twitter',
	label: 'Twitter',
	enableJs: true,
	pageUrl: 'https://mobile.twitter.com/explore/tabs/trending',
}];
