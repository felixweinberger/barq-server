import express from 'express';

import { getMenu, pay } from '../controllers/customer.ctrl';

const router = express.Router();

router
  .get('/:barId/menu', getMenu)
  .post('/:barId/pay', pay);

export default router;
