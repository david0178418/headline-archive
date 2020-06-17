import Head from 'next/head';
import {
	Container,
	Nav,
	Card,
} from 'react-bootstrap';
import { useEffect } from 'react';

export
async function getServerSideProps() {
	const { getProps } = await import('../functions/server-side-props');
	return {
		props: {
			feeds: await getProps(),
		},
	};
}

export default
function Home({feeds}: any) {
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

				{[].map((d, i) => (
					<Card key={i}>
						<Card.Body>
							<Card.Img variant="top" src="https://via.placeholder.com/640x480" />
							<Card.Text>
								fooo
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
