import Head from 'next/head';
import {
	Container,
	Nav,
	Card,
	ListGroup,
	Image,
	Row,
	Col,
	Modal,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Feed } from 'interfaces';
import { format } from 'date-fns';

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
}

function SiteCard(props: SiteCardProp) {
	const [modalOpen, setModalOpen] = useState(false);
	const { feed } = props;
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
					{feed.feed.title}
				</Card.Title>
			</Card.Body>
			<Card.Header>
				Top Stories
			</Card.Header>
			<ListGroup variant="flush">
				{feed.feed.items.map((item, i) => (
					<ListGroup.Item key={i}>
						<a target="__blank" href={item.link}>
							{item.title}
						</a>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Card>
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
	useEffect(() => {
		console.log(feeds);
	}, []);

	return (
		<div>
			<Head>
				<title>Next.js on Firebase Hosting</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<title>
				Fiiiz
			</title>

			<Container>
				<Nav activeKey="/home" >
					<Nav.Item>
						<Nav.Link href="/home">Active</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="link-1">Link</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="link-2">Link</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="disabled" disabled>
						Disabled
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Container>
					<Row>
						{feeds?.map(f => (
							<Col key={f.key}>
								<SiteCard feed={f} />
							</Col>
						))}
					</Row>
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
