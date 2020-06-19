import { Feed } from 'interfaces';
import { ArticleListing } from '@components/article-listing';

export
async function getServerSideProps() {
	const { getProps } = await import('@functions/server-side-props');
	return {
		props: {
			feeds: await getProps(),
		},
	};
}

interface Props {
	feeds: Feed[];
}

export default
function Home({feeds}: Props) {
	return (
		<ArticleListing feeds={feeds}/>
	);
}
