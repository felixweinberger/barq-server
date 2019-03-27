import express from 'express';

import authorize from '../middleware/authorization';
import * as ctrl from '../controllers/staff.ctrl';

const router = express.Router();

router
  .get('/:barId/queue', authorize, ctrl.fetchQueue)
  .post('/:barId/open', authorize, ctrl.setBarStatus)
  .get('/:barId/code', ctrl.checkStaffCode);

export default router;
