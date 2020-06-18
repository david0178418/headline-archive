import Head from 'next/head';
import {
	Container,
	Card,
	ListGroup,
	Image,
	Row,
	Col,
	Modal,
	OverlayTrigger,
	Popover,
	Accordion,
} from 'react-bootstrap';
import { useState } from 'react';
import { Feed } from 'interfaces';
import { format } from 'date-fns';
import { chunk } from 'helpers/utils';

export
async function getServerSideProps() {
	const { getProps } = await import('../functions/server-side-props');
	return {
		props: {
			feeds: await getProps(),
		},
	};
}

const BUCKET = 'headline-archive.appspot.com';
const BASE_URL = 'https://firebasestorage.googleapis.com';

interface ImagePreviewProps {
	open: boolean;
	onClose(): void;
	img: string;
}

function ImagePreview(props: ImagePreviewProps) {
	const {
		img,
		open,
		onClose,
	} = props;

	return (
		<>
			<Modal
				show={open}
				onHide={onClose}
				dialogClassName="screenshot-preview"
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Custom Modal Styling
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image src={img} fluid rounded />
				</Modal.Body>
			</Modal>
		</>
	);
}

interface SiteCardProp {
	feed: Feed;
	rowKey: string;
	last?: boolean;
	expanded?: boolean;
	onToggle(): void;
}

function SiteCard(props: SiteCardProp) {
	const [modalOpen, setModalOpen] = useState(false);
	const {
		feed,
		last,
		rowKey,
		expanded,
		onToggle,
	} = props;
	const img = imageUrl(feed);

	return (
		<Card>
			<Card.Footer>
				<small className="text-muted">
					{format(new Date(feed.date), 'PPpp')}
				</small>
			</Card.Footer>
			<Card.Img
				variant="top"
				className="card-screenshot"
				src={img}
				onClick={() => setModalOpen(true)}
			/>
			<ImagePreview
				img={img}
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
			<Card.Body>
				<Card.Title>
					<a href={feed.pageUrl} target="__blank">
						{feed.label}
					</a>
				</Card.Title>
			</Card.Body>
			<Accordion activeKey={expanded ? rowKey : ''}>
				<Accordion.Toggle
					as={Card.Header}
					eventKey={rowKey}
					onClick={onToggle}
				>
					Top Stories
					<svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
					</svg>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={rowKey}>
					<ListGroup variant="flush">
						{feed.feed.items.map((item, i) => (
							<ListGroup.Item key={i}>
								<OverlayTrigger
									trigger="hover"
									placement={last ? 'left' : 'right'}
									overlay={
										<Popover id={item.guid}>
											<Popover.Content>
												{item.contentSnippet}
											</Popover.Content>
										</Popover>
									}
								>
									<div>
										<a target="__blank" href={item.link}>
											{item.title}
										</a>
									</div>
								</OverlayTrigger>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Accordion.Collapse>
			</Accordion>
		</Card>
	);
}

interface ArticleRowProps {
	feeds: Feed[];
	rowKey: number;
}

function ArticleRow(props: ArticleRowProps) {
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

function imageUrl(feed: Feed) {
	return `${BASE_URL}/v0/b/${BUCKET}/o/${encodeURIComponent(`screenshots/${feed.screenDir}/${feed.key}.png`)}?alt=media`;
}

interface Props {
	feeds: Feed[];
}

export default
function Home({feeds}: Props) {
	return (
		<div>
			<Head>
				<title>
					Headline Archive
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<h2>
					Headline Archive
				</h2>
				<Container>
					{chunk(feeds, 3).map((rowFeeds, i) => (
						<ArticleRow
							key={i}
							rowKey={i}
							feeds={rowFeeds}
						/>
					))}
				</Container>
			</Container>

			<style jsx>{`
				title {
					color: red;
				}
			`}</style>

		</div>
	);
}
