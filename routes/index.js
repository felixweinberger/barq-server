import express from 'express';

const router = express.Router();

const ownerRoutes = require('./ownerRoutes');
const staffRoutes = require('./staffRoutes');
const customerRoutes = require('./customerRoutes');

router
  .use('/owner', ownerRoutes)
  .use('/staff', staffRoutes)
  .use('/customer', customerRoutes);

module.exports = router;
