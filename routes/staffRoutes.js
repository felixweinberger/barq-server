import express from 'express';
import { fetchQueue, setBarStatus } from '../controllers/staff';

const router = express.Router();

router.get('/:barId/queue', fetchQueue);
router.post('/:barId/open', setBarStatus);
// router.get('/:barId/code', checkCode);

export default router;
