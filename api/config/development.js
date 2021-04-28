module.exports = {
	app: {
		root: '/',
		host: '127.0.0.1',
		port: 8080,
		allowed_cors_domains: ['https://localhost:3000', 'http://localhost:3000']
	},

	env: process.env.NODE_ENV || 'development'
};
