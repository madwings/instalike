/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import block_list from './block_list.json';

const nock = require('nock');
const app = require('../../../src/app');

describe('GET /block/*', () => {
	describe('GET /block/list', () => {
		afterAll(() => {
			nock.cleanAll();
		});

		const path = '/block/list?variables={"item":"1"}';

		it('Returns OK request', async () => {
			nock('https://blockchain.info').get('/blocks?format=json').reply(200, block_list);
			const response = await request(app).get(path);
			expect(response.status).toBe(200);
			expect(response.body.height).toEqual(675543);
		});
	});
});
