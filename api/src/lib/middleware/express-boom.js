import Debug from 'debug';
import boom from '@hapi/boom';

const debug = Debug('service-instalike:lib:middleware:express-boom');

const checkExistence = (req, res, next) => {
	if (res.boom) {
		next(boom.badImplementation('Boom already exists on response object'));
	}
};

const expressBoom = (req, res, next) => {
	checkExistence(req, res, next);

	const helperMethods = Object.create(null);
	helperMethods.boomify = boom.boomify.bind(boom);
	helperMethods.isBoom = boom.isBoom.bind(boom);

	res.boom = Object.create(helperMethods);

	const keys = Object.getOwnPropertyNames(boom).filter(key => {
		return typeof boom[key] === 'function' && !helperMethods[key];
	});

	for (const key of keys) {
		res.boom[key] = (message, data) => {
			const boomed = boom[key].apply(boom, arguments).output;

			// debug('boomed', boomed);
			// respond(res, boomed, data);
			// debug('here...');
		};
	}
	next();
};

export default expressBoom;
