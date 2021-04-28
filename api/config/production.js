module.exports = {
	app: {
		root: '/',
		host: '0.0.0.0',
		port: 8080,
		allowed_cors_domains: []
	},

	env: process.env.NODE_ENV || 'production'
};
