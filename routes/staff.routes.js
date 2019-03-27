import express from 'express';
import { fetchQueue, setBarStatus, checkCode } from '../controllers/staff';
import authorize from '../middleware/authorization';

const router = express.Router();

router.get('/:barId/queue', authorize, fetchQueue)
  .post('/:barId/open', authorize, setBarStatus)
  .get('/:barId/code', checkCode);

export default router;
