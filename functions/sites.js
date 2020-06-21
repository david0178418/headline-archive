// @ts-check



/**
 * @typedef { import ("../interfaces").BiasLabel } BiasLabel
 *
 * @type { {[key: string]: BiasLabel} }
 */
const Bias = {
	Left: 'left',
	Center: 'center',
	Right: 'right',
};

exports.Bias = Bias;

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
	bias: Bias.Center,
	biasUrl: 'https://www.allsides.com/news-source/cnbc',
}, {
	key: 'cnn',
	label: 'CNN',
	enableJs: true,
	pageUrl: 'https://cnn.com',
	feedUrl: 'http://rss.cnn.com/rss/cnn_topstories.rss',
	bias: Bias.Left,
	biasUrl: 'https://www.allsides.com/news-source/cnn-media-bias',
}, {
	key: 'daily-wire',
	label: 'The Daily Wire',
	pageUrl: 'https://www.dailywire.com/',
	feedUrl: 'https://www.dailywire.com/rss.xml',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/daily-wire',
}, {
	key: 'drudgereport',
	label: 'Drudge Report',
	pageUrl: 'https://drudgereport.com/',
	feedUrl: 'https://feedpress.me/drudgereportfeed',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/drudge-report',
}, {
	key: 'foxnews',
	label: 'Fox News',
	pageUrl: 'https://www.foxnews.com/',
	feedUrl: 'http://feeds.foxnews.com/foxnews/latest',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/fox-news-media-bias',
}, {
	key: 'google-news',
	label: 'Google News',
	pageUrl: 'https://news.google.com',
	feedUrl: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
	bias: Bias.Left,
	biasUrl: 'https://www.allsides.com/news-source/google-news-media-bias',
}, {
	key: 'the-hill',
	label: 'The Hill',
	pageUrl: 'https://thehill.com/',
	feedUrl: 'https://thehill.com/rss/syndicator/19110',
	bias: Bias.Center,
	biasUrl: 'https://www.allsides.com/news-source/hill-media-bias',
}, {
	key: 'huffpost',
	label: 'HuffPost',
	pageUrl: 'https://www.huffpost.com/',
	feedUrl: 'https://www.huffpost.com/section/us-news/feed',
	bias: Bias.Left,
	biasUrl: 'https://www.allsides.com/news-source/huffpost-media-bias',
}, {
	key: 'marketwatch',
	label: 'MarketWatch',
	enableJs: true,
	pageUrl: 'https://www.marketwatch.com',
	feedUrl: 'http://www.marketwatch.com/rss/topstories',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/marketwatch-media-bias',
}, {
	key: 'msnbc',
	label: 'MSNBC',
	pageUrl: 'https://www.msnbc.com/',
	feedUrl: 'http://www.msnbc.com/feeds/latest',
	enableJs: true,
	bias: Bias.Left,
	biasUrl: 'https://www.allsides.com/news-source/msnbc',
}, {
	key: 'nypost',
	label: 'New York Post',
	pageUrl: 'https://nypost.com/',
	feedUrl: 'https://nypost.com/news/feed/',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/new-york-post',
}, {
	key: 'nytimes',
	label: 'New York Times',
	scrollTo: '.NYTAppHideMasthead',
	pageUrl: 'https://www.nytimes.com/',
	feedUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
	bias: Bias.Left,
	biasUrl: 'https://www.allsides.com/news-source/new-york-times',
}, {
	key: 'politico',
	label: 'Politico',
	pageUrl: 'https://www.politico.com/',
	feedUrl: 'https://rss.politico.com/headlines.xml',
	bias: Bias.Left,
	enableJs: true,
	biasUrl: 'https://www.allsides.com/news-source/politico-media-bias',
}, {
	key: 'reason',
	label: 'Reason',
	pageUrl: 'https://reason.com/',
	feedUrl: 'https://reason.com/feed/',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/reason',
}, {
	key: 'usa-today',
	label: 'USA Today',
	pageUrl: 'https://www.usatoday.com/',
	feedUrl: 'http://rssfeeds.usatoday.com/usatoday-newstopstories',
	bias: Bias.Center,
	biasUrl: 'https://www.allsides.com/news-source/usa-today-media-bias',
}, {
	key: 'vox',
	label: 'Vox',
	pageUrl: 'https://www.vox.com/',
	feedUrl: 'https://www.vox.com/rss/index.xml',
	bias: Bias.Left,
	biasUrl: 'https://www.allsides.com/news-source/vox-news-media-bias',
}, {
	key: 'washingtontimes',
	label: 'Washington Times',
	pageUrl: 'https://www.washingtontimes.com/',
	feedUrl: 'https://www.washingtontimes.com/rss/headlines/',
	bias: Bias.Right,
	biasUrl: 'https://www.allsides.com/news-source/washington-times-bias',
}];
