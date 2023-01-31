import Debug from 'debug';
import boom from '@hapi/boom';

const debug = Debug('service-instalike:lib:errors');
const error = Debug('service-instalike:error:errmiddleware');

// catch 404 and forward to error handler
const notFound = (req, res, next) => {
	const info = {
		method: req.method,
		url: req.url
	};
	debug('notFound info: %o', info);
	const err = boom.notFound();
	err.status = 404;
	next(err);
};

// eslint-disable-next-line no-unused-vars
const handler = (err, req, res, next) => {
	const env = process.env.NODE_ENV || 'development';
	let statusCode;
	let message;
	let stack;
	let errors;
	if (err.output) {
		statusCode = err.output.payload.statusCode;
		message = err.output.payload.message;
		stack = {};
		errors = err.data;
	} else {
		statusCode = err.statusCode;
		message = err.message;
		stack = err.stack;
	}
	error(`Exception thrown: ${err}`);
	res.status(statusCode || err.status || 500).json({
		status: 'error',
		message: env !== 'production' ? message : {},
		stack: env !== 'production' ? stack : {},
		errors
	});
};

export default {
	notFound,
	handler
};
