import express from 'express';
import customer from '../controllers/customer';

const router = express.Router();

router
  .get('/:barId/menu', customer.getMenu)
  .post('/:barId/pay', customer.pay);

export default router;
