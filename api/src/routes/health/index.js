import express from 'express';

import healthController from '../../controllers/health';

const router = express.Router();

// GET /
router.get('/', healthController.root);

// GET /health
router.get('/health', healthController.health);

// GET /gdpr
// router.get('/gdpr/:user_id', healthController.gdpr);

export default router;
