import Head from 'next/head';
import {
	Container,
	Nav,
	Card,
} from 'react-bootstrap';

const data = [{
	imageUrl: 'https://via.placeholder.com/250x350',
}, {
	imageUrl: 'https://via.placeholder.com/250x350',
}, {
	imageUrl: 'https://via.placeholder.com/250x350',
}]

export default
function Home() {

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

				{data.map(d => (
					<Card>
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
