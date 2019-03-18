import express from 'express';
import staff from '../controllers/staff';

const router = express.Router();

// Something
router.get('/', staff.something);

export default router;
