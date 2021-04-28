import Debug from 'debug';
import boom from '@hapi/boom';
import { check, validationResult } from 'express-validator';

const debug = Debug('service-limechain:lib:middleware:validator');

const areRequired = params => {
	debug('areRequired params', params);
	return params.map(p => {
		debug('areRequired: param', p);
		return check(p).exists();
	});
};

const isNumeric = params => {
	debug('isNumeric params', params);
	return params.map(p => {
		debug('isNumeric: param', p);
		return check(p).isNumeric();
	});
};

const processErrors = (req, res, next) => {
	const errors = validationResult(req);
	debug('Validation errors found: %o', errors);

	if (!errors.isEmpty()) {
		next(boom.badRequest('Invalid Request', errors.mapped()));
	}
	next();
};

export default { areRequired, isNumeric, processErrors };
