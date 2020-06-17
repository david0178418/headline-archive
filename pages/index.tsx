import Head from 'next/head';
import {
	Container,
	Nav,
	Card,
} from 'react-bootstrap';
import { useEffect } from 'react';
import { Feed } from 'interfaces';

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
				{feeds?.map(f => (
					<Card key={f.key}>
						<Card.Body>
							<Card.Img
								variant="top"
								src={imageUrl(f)}
							/>
							<Card.Title>
								{f.feed.title}
							</Card.Title>
							<Card.Text>
								{f.feed.description}
							</Card.Text>
						</Card.Body>
					</Card>
				))}

			</Container>

			<style jsx>{`
				title {
					color: red;
				}
			`}</style>

		</div>
	);
}
