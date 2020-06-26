import {
	Card,
	ListGroup,
	Accordion,
} from 'react-bootstrap';
import {
	ChevronDown,
	ChevronUp,
	ArrowLeftCircleFill,
	CircleFill,
	ArrowRightCircleFill,
	Link45deg,
} from 'react-bootstrap-icons';
import { useState } from 'react';
import { Feed } from 'interfaces';
import { format } from 'date-fns';
import { ImagePreview } from '@components/image-preview';

const BUCKET = 'headline-archive.appspot.com';
const BASE_URL = 'https://firebasestorage.googleapis.com';

function imageUrl(feed: Feed) {
	return `${BASE_URL}/v0/b/${BUCKET}/o/${encodeURIComponent(`screenshots/${feed.screenDir}/${feed.key}.png`)}?alt=media`;
}

interface Props {
	feed: Feed;
	rowKey: string;
	last?: boolean;
	expanded?: boolean;
	onToggle(): void;
}

export
function SiteCard(props: Props) {
	const [modalOpen, setModalOpen] = useState(false);
	const {
		feed,
		rowKey,
		expanded,
		onToggle,
	} = props;
	const img = imageUrl(feed);

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					<a href={feed.pageUrl} target="__blank">
						{feed.label} {feed.satire ? '(satire)' : ''}
					</a>
				</Card.Title>
			</Card.Body>

			{feed.bias && feed.biasUrl && (
				<Card.Footer>
					<small className="text-muted float-right">
						<a
							href={feed.biasUrl}
							target="__blank"
							className="capitalize"
						>
							{'AllSides Lean Rating: '}
							<span className={`color-${feed.bias}`}>
								{feed.bias === 'left' && (
									<ArrowLeftCircleFill size={24} />
								)}
								{feed.bias === 'center' && (
									<CircleFill size={24} />
								)}
								{feed.bias === 'right' && (
									<ArrowRightCircleFill size={24} />
								)}
								<span className="capilize">
									{` ${feed.bias}`}
								</span>
							</span>
							<Link45deg/>
						</a>
					</small>
				</Card.Footer>
			)}
			<Card.Img
				variant="top"
				className="card-screenshot"
				src={img}
				onClick={() => setModalOpen(true)}
			/>
			<ImagePreview
				img={img}
				label={feed.label}
				link={feed.pageUrl}
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
			<Card.Footer>
				<small className="text-muted">
					{format(new Date(feed.date), 'PPp')}
				</small>
			</Card.Footer>
			{feed.feed && (
				<Accordion activeKey={expanded ? rowKey : ''}>
					<Accordion.Toggle
						as={Card.Header}
						eventKey={rowKey}
						onClick={onToggle}
						className="top-stories-toggle"
					>
						<strong>
							Top Stories
							{expanded ?
								<ChevronUp/> :
								<ChevronDown/>
							}
						</strong>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={rowKey}>
						<ListGroup variant="flush">
							{feed.feed.items.map((item, i) => (
								<ListGroup.Item key={i}>
									<div>
										<a target="__blank" href={item.link}>
											{item.title}
										</a>
										{item.contentSnippet && (
											<p>
												<em>Preview:</em> <span dangerouslySetInnerHTML={{__html: item.contentSnippet}} />
											</p>
										)}
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Accordion.Collapse>
				</Accordion>
			)}
		</Card>
	);
}
