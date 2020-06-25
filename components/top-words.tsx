import { Feed } from 'interfaces';
import { notFalsy } from 'helpers/utils';
import { COMMON_WORDS } from 'helpers/common-words';
import { useRef, useEffect, useState } from 'react';
import wordcloud from 'wordcloud';

// From https://stackoverflow.com/questions/18473326/javascript-break-sentence-by-words/18473642
// const MATCHER = /\b(\w+)\b/g;
const MATCHER = /\b(\w+)'?(\w+)?\b/g;

interface Props {
	feeds: Feed[];
}

export
function TopWords(props: Props) {
	const canvasRef = useRef<HTMLCanvasElement|null>(null);
	const [list, setList] = useState<any[]>([]);
	const {
		feeds,
	} = props;

	function updateWidthAndHeight() {
		const el = canvasRef.current;
		const total = list.reduce((s, i) => i[1], 0);

		if(!(el && el.parentElement)) {
			return;
		}

		el.width = el.parentElement.clientWidth;

		wordcloud(el, {
			list,
			minRotation: 0,
			maxRotation: 0,
			weightFactor: (size) => {
				return (size/total) * el.width / 30;
				// return size * el.width / sizeFactor;
			},
			click: (e) => console.log(e),
		});
	}

	useEffect(() => {
		window.addEventListener('resize', updateWidthAndHeight);
	
		return () => window.removeEventListener('resize', updateWidthAndHeight);
	}, []);

	useEffect(() => {
		updateWidthAndHeight();
	}, [list]);

	useEffect(() => {
		const tokens = [
			...feeds.map(f =>
				f.feed?.items.map(
					i => i.title.toLowerCase().match(MATCHER),
				) || [],
			),
		]
		.flat(2)
		.filter(notFalsy);

		const dictionary = tokens
			.reduce((dictionary, t) => {
				if(t.length > 1 && !COMMON_WORDS[t]) {
					if(!dictionary[t]) {
						dictionary[t] = 0;
					}
					dictionary[t]++;
				}
				return dictionary;
			}, {} as any);

		setList(
			Object
				.keys(dictionary)
				.map(word => ([
					word,
					dictionary[word],
				]))
				.sort((a, b) => b[1] - a[1])
				.slice(0, 15),
		);
	}, [feeds]);

	return (
		<>
			<canvas height="250px" ref={canvasRef}/>
			<p>
				Common Headline Words
			</p>
		</>
	);
}

export default TopWords;
