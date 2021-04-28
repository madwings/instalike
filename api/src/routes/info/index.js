import express from 'express';

import infoController from '../../controllers/info';

const router = express.Router();

/** GET /info - Check service health */
router.get('/info', infoController.info);

export default router;
