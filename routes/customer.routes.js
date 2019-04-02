import express from 'express';

import * as ctrl from '../controllers/customer.ctrl';

const router = express.Router();

router
  .get('/:barId', ctrl.getApp)
  .get('/:barId/menu', ctrl.getMenu)
  .post('/:barId/pay', ctrl.pay);

export default router;
