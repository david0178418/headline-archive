import { Feed } from 'interfaces';
import { ArticleListing } from '@components/article-listing';

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
		<ArticleListing feeds={feeds}/>
	);
}
