import express from 'express';

import authorize from '../middleware/authorization';
import { fetchQueue, setBarStatus, checkStaffCode } from '../controllers/staff.ctrl';

const router = express.Router();

router
  .get('/:barId/queue', authorize, fetchQueue)
  .post('/:barId/open', authorize, setBarStatus)
  .get('/:barId/code', checkStaffCode);

export default router;
