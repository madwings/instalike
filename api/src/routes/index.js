import express from 'express';
import infoRouter from './info';
import blcoksRouter from './block';

const router = express.Router();

router.use(infoRouter);
router.use('/block', blcoksRouter);

export default router;
