const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const { version } = require(path.resolve(process.cwd(), 'package.json'));

module.exports = {
	app: {
		root: '/',
		host: '0.0.0.0',
		port: 8080,
		allowed_cors_domains: [],
		allowed_headers: ['Content-Type'],
		allowed_methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'HEAD', 'DELETE']
	},

	version,

	caching: {
		elasticache: {
			endpoint: null // process.env.ELASTICACHE_ENDPOINT
		},
		blocks_ttl: 60 * 5, // 5 minutes
		blocks_key: 'blocks'
	},

	blocks_endpoint: 'https://blockchain.info/blocks?format=json'
};
