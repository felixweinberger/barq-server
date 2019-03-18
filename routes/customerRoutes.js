import express from 'express';
import customer from '../controllers/customer';

const router = express.Router();

// get menu for given barId
router.get('/:barId/menu', customer.getMenu);

// pay
router.post('/:barId/pay', customer.pay);

export default router;
