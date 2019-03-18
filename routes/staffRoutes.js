import express from 'express';
import staff from '../controllers/staff';

const router = express.Router();

// get queue for given barId given they are members
router.get('/staff/:barId/queue', staff.getQueue);

// open/close the bar for orders
router.post('/staff/:barId/open', staff.setBarStatus);

export default router;
