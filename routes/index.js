import express from 'express';

import ownerRoutes from './ownerRoutes';
import staffRoutes from './staffRoutes';
import customerRoutes from './customerRoutes';

const router = express.Router();

router
  .use('/owner', ownerRoutes)
  .use('/staff', staffRoutes)
  .use('/', customerRoutes);

export default router;
