export
interface Article {
	content: string;
	contentSnippet: string;
	guid: string;
	isoDate: string;
	link: string;
	pubDate: string;
	title: string;
}

export
interface Feed {
	key: string;
	date: string;
	feed: {
		items: Article[];
		description: string;
		image: {
			url: string;
			title: string;
			link: string;
		};
		link: string;
		title: string;
		lastBuildDate: string;
		pubDate: string;
	};
	feedUrl: string;
	pageUrl: string;
	screenDir: string;
}
