import express from 'express';
import path from 'path';

import ownerRoutes from './owner.routes';
import staffRoutes from './staff.routes';
import customerRoutes from './customer.routes';

const router = express.Router();

router
  .use('/owner', ownerRoutes)
  .use('/staff', staffRoutes)
  .use('/', customerRoutes)
  .get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'index.html'));
  });

export default router;
