module.exports = {
	distDir: "nextjs",
	target: 'serverless',
	env: {
		FIREBASE_PROJECT_ID: "headline-archive",
	},
	experimental: {
		sprFlushToDisk: false,
	},
};
