import express from 'express';
import customer from '../controllers/customer';

const router = express.Router();

// Something
router.get('/', customer.something);

export default router;
