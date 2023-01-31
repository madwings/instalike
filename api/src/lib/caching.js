// TODO turn into private package (also used in content-polling and async-cache services)
import Debug from 'debug';
import * as config from 'config';
import util from 'util';

const debug = Debug('service-instalike:lib:caching');
const error = Debug('service-instalike:error:lib:caching');
const redis =
	config.env === 'test'
		? require('redis-mock')
		: require('redis'); // eslint-disable-line

let client_instance;
let get_async;
let set_async;
let keys_async;
let del_async;
let zadd_async;
let zrange_async;
let expire_async;
let zremrangebyrank_async;
let ttl_async;

const get_client = () => {
	if (!client_instance) {
		// Create our client
		debug(
			'Creating redis client with endpoint: %s',
			config.caching.elasticache.endpoint
		);
		const options = {
			url: `redis://${config.caching.elasticache.endpoint}`
		};
		if (config.caching.elasticache.db_number) {
			options.db = config.caching.elasticache.db_number;
		}
		client_instance = redis.createClient(options);

		// Attach event listeners
		debug('Attaching redis event listeners');
		client_instance.on('error', err => {
			error('Redis client error: %o', err);
		});

		// Promisify used functions
		get_async = util.promisify(client_instance.get).bind(client_instance);
		set_async = util.promisify(client_instance.set).bind(client_instance);
		keys_async = util.promisify(client_instance.keys).bind(client_instance);
		del_async = util.promisify(client_instance.del).bind(client_instance);
		zadd_async = util.promisify(client_instance.zadd).bind(client_instance);
		zrange_async = util.promisify(client_instance.zrange).bind(client_instance);
		expire_async = util.promisify(client_instance.expire).bind(client_instance);
		zremrangebyrank_async = util.promisify(client_instance.zremrangebyrank).bind(client_instance);
		ttl_async = util.promisify(client_instance.ttl).bind(client_instance);
	}
	return {
		getAsync: get_async,
		setAsync: set_async,
		keysAsync: keys_async,
		delAsync: del_async,
		zaddAsync: zadd_async,
		zrangeAsync: zrange_async,
		expireAsync: expire_async,
		zremrangebyrankAsync: zremrangebyrank_async,
		ttlAsync: ttl_async
	};
};

const del = async key => {
	if (!config.caching.elasticache.endpoint) {
		return null;
	}
	const { delAsync } = get_client();
	debug('Get key: %o', key);
	const result = await delAsync(key);
	debug('Result: %o', result);
	return result;
};

const keys = async key => {
	if (!config.caching.elasticache.endpoint) {
		return null;
	}
	const { keysAsync } = get_client();
	debug('Get key: %o', key);
	const result = await keysAsync(key);
	debug('Result: %o', result);
	return result;
};

const get = async key => {
	if (!config.caching.elasticache.endpoint) {
		return null;
	}
	const { getAsync } = get_client();
	debug('Get key: %o', key);
	const result = await getAsync(key);
	debug('Result: %o', result);
	return JSON.parse(result);
};

const set = async (key, object, ttl = 0) => {
	if (!config.caching.elasticache.endpoint) {
		return null;
	}
	const { setAsync } = get_client();
	debug('Set key <%s> ttl <%d> object: %o', key, ttl, object);
	const stringified = JSON.stringify(object);
	// if we have a ttl, set the expire time, else just set it
	const result =
			ttl > 0
				? await setAsync(key, stringified, 'EX', ttl)
				: await setAsync(key, stringified);

	debug('Result: %o', result);
	return result;
};

const expire = async (key, seconds) => get_client().expireAsync(key, seconds);
const zrange = async (key, start, stop) => get_client().zrangeAsync(key, start, stop);
const zadd = async (key, score, object) => get_client().zaddAsync(key, score, object);
const zremrangebyrank = async (key, start, stop) => get_client().zremrangebyrankAsync(key, start, stop);
const ttl = async (key) => get_client().ttlAsync(key);
const exports_obj = {
	del,
	keys,
	set,
	get,
	expire,
	zrange,
	zadd,
	zremrangebyrank,
	ttl
};

module.exports = exports_obj;
export default exports_obj;
