import {
	Col,
} from 'react-bootstrap';
import { useState } from 'react';
import { Feed } from 'interfaces';
import { SiteCard } from '@components/site-card';

interface Props {
	feeds: Feed[];
	rowKey: number;
}

export
function ArticleRow(props: Props) {
	const [expanded, setExpanded] = useState(false);
	const {
		feeds,
		rowKey,
	} = props;
	const rowKeyStr = `key-${rowKey}`;

	return (
		<>
			{feeds.map((f, j) => (
				<Col key={f.key} sm={12} md={6} lg={4} className="mt-4 px-0 px-md-2">
					<SiteCard
						feed={f}
						rowKey={rowKeyStr}
						last={j === 2}
						expanded={expanded}
						onToggle={() => setExpanded(!expanded)}
					/>
				</Col>
			))}
		</>
	);
}
