import express from 'express';

import ownerRoutes from './owner.routes';
import staffRoutes from './staff.routes';
import customerRoutes from './customer.routes';

const router = express.Router();

router
  .use('/owner', ownerRoutes)
  .use('/staff', staffRoutes)
  .use('/', customerRoutes);

export default router;
