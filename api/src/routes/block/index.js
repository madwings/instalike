import express from 'express';

import blocksController from '../../controllers/block';
import validator from '../../lib/middleware/validator';

const router = express.Router();

const validateFeedFunc = () => [
	validator.areRequired(['variables']),
	// validator.isNumeric(['feed_id']),
	validator.processErrors
];

/** GET /feeds/:id - feed by id */
router.get('/list', validateFeedFunc(), blocksController.get_list);

export default router;
