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
					{!IS_DEV && (
						<>
							<script async src="https://www.googletagmanager.com/gtag/js?id=UA-7940406-3"></script>
							<script
								dangerouslySetInnerHTML={{
									__html: `
										window.dataLayer = window.dataLayer || [];
										function gtag(){dataLayer.push(arguments);}
										gtag('js', new Date());
										gtag('config', 'UA-7940406-3');
									`
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument
