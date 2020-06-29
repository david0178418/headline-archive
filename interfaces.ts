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
interface Feed extends Site {
	date: string;
	feed?: {
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
	screenDir: string;
}

export
type BiasLabel = 'left' | 'right' | 'center';

export
interface Site {
	enableJs?: boolean;
	feedUrl?: string;
	key: string;
	label: string;
	pageUrl: string;
	satire?: boolean;
	scrollTo?: string;
	bias?: BiasLabel;
	biasUrl?: string;
	wait?: number;
}
