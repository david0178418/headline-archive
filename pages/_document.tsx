import Document, { Html, Head, Main, NextScript } from 'next/document'

const IS_DEV = process.env.NODE_ENV === 'development';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
					<link rel="manifest" href="/site.webmanifest"/>
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
					<meta name="msapplication-TileColor" content="#da532c"/>
					<meta name="theme-color" content="#ffffff"/>
				</Head>
				<body>
					<Main />
					<NextScript />
					{!IS_DEV && (
						<>
							<script async src="https://www.googletagmanager.com/gtag/js?id=UA-7940406-3"></script>
							<script
								type="module"
								dangerouslySetInnerHTML={{
									__html: `
										// yolo!
										import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
										import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
										
										const firebaseConfig = {
											apiKey: "AIzaSyAhXzsCJBNNf1HLHLGu_vp65RKWT9sYyOI",
											authDomain: "headline-archive.firebaseapp.com",
											databaseURL: "https://headline-archive.firebaseio.com",
											projectId: "headline-archive",
											storageBucket: "headline-archive.appspot.com",
											messagingSenderId: "471877828683",
											appId: "1:471877828683:web:29eaea87354074ab830dce",
											measurementId: "G-7JB06PKFHF"
										};

										// Initialize Firebase
										const app = initializeApp(firebaseConfig);
										const analytics = getAnalytics(app);
										logEvent(analytics, 'page_load');
									`
								}}
							/>
						</>
					)}
				</body>
			</Html>
		);
	}
}

export default MyDocument
