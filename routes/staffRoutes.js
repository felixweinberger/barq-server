import express from 'express';
import { fetchQueue, setBarStatus } from '../controllers/staff';

const router = express.Router();

// get queue for given barId given they are members
router.get('/:barId/queue', fetchQueue);

// open/close the bar for orders
router.post('/:barId/open', setBarStatus);

export default router;
