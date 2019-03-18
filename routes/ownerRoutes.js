import express from 'express';
import owner from '../controllers/owner';

const router = express.Router();

// Something
router.get('/', owner.something);

export default router;
