import Head from 'next/head';
import {
	Container,
	Form,
	Col,
} from 'react-bootstrap';
import { Feed } from 'interfaces';
import { chunk } from 'helpers/utils';
import { ArticleRow } from '@components/article-row';

export
async function getServerSideProps({params}: any) {
	const { getProps } = await import('@functions/server-side-props');
	return {
		props: {
			feeds: await getProps(params.datetime),
		},
	};
}

interface Props {
	feeds: Feed[];
}

export default
function Archive({feeds}: Props) {
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
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>
								Date
							</Form.Label>
							<Form.Control type="date"/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>
								Hour
							</Form.Label>
							<Form.Control as="select" custom>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>
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
