import Head from "next/head";
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

export
async function getStaticProps() {
	return {
		props: {
			data: "Data from some external API fetched at build-time",
		},
	};
}

export default 
function About({ data }: any) {
	return (
		<div className="container">
			<Head>
				<title>Next.js SSG on Firebase Hosting</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />
			</main>

			<Footer />
		</div>
	);
}
