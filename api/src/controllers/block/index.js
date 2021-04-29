import Debug from 'debug';
import config from 'config';
import axios from 'axios';
import caching from '../../lib/caching';

const debug = Debug('service-limechain:controllers:feeds');

const get_list = async (req, res) => {
	debug('Getting list of blocks');

	// Caching needs more configs, but should work fine once configured.
	// Due to the `redis-mock` in tests and lack of endpoint in config it is working fine without being commented
	const variables = JSON.parse(req.query.variables);
	const item = parseInt(variables?.item, 10);
	const key = item >= 0 ? item : 0;
	const cache_key = `${config.caching.blocks_key}_${key}`;
	let result = await caching.get(cache_key);
	if (result) {
		debug('Get Cache');
		return res.json(result);
	}

	const response = await axios.get(`${config.blocks_endpoint}`);

	if (response.data.blocks[key]) {
		debug('Set Result and Cache');
		result = response.data.blocks[key];
		caching.set(cache_key, result, config.caching.blocks_ttl);
	}

	return res.json(result);
};

export default {
	get_list
};
