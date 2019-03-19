import express from 'express';
import staff from '../controllers/staff';

console.log(typeof staff.getQueue);

const router = express.Router();

// get queue for given barId given they are members
router.get('/:barId/queue', staff.getQueue);

// open/close the bar for orders
router.post('/:barId/open', staff.setBarStatus);

export default router;
