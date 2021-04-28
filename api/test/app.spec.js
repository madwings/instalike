const request = require('supertest');
const debug = require('debug')('service-content:test');
const config = require('config');
const app = require('../src/app');

debug('process.env.NODE_ENV', process.env.NODE_ENV);

describe('Test the root path', () => {
	it('responds to the GET method', async () => {
		const response = await request(app).get('/');

		expect(response.statusCode).toBe(200);
		expect(response.body.root).toEqual(true);
	});
});

describe('Test the health path', () => {
	it('responds to the GET /health method', async () => {
		const response = await request(app).get('/health');

		expect(response.statusCode).toBe(200);
		expect(response.body.status).toEqual('ok');
	});
});

describe('Test application error', () => {
	it('responds with an error', async () => {
		const response = await request(app)
			.get('/foo')
			.expect(404);

		expect(response.status).toEqual(404);
	});
});

describe('Test cors error', () => {
	it('responds with an error', async () => {
		const response = await request(app).options('/info').set('Origin', 'shit');

		expect(response.status).toEqual(500);
		expect(response.error.method).toEqual('OPTIONS');
	});
});
