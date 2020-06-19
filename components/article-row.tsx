import {
	Row,
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
		<Row>
			{feeds.map((f, j) => (
				<Col key={f.key} md={12} lg={4}>
					<SiteCard
						feed={f}
						rowKey={rowKeyStr}
						last={j === 2}
						expanded={expanded}
						onToggle={() => setExpanded(!expanded)}
					/>
				</Col>
			))}
		</Row>
	);
}
