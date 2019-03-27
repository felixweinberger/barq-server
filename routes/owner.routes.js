import express from 'express';

import authorize from '../middleware/authorization';
import * as ctrl from '../controllers/owner.ctrl';

const router = express.Router();

router
  .post('/', ctrl.registerOwner)
  .get('/', ctrl.loginOwner)
  .get('/me', ctrl.authorizeOwner)
  .delete('/', authorize, ctrl.deleteOwner)
  .post('/bars', authorize, ctrl.createBar)
  .delete('/bars/:barId', authorize, ctrl.deleteBar)
  .get('/bars/:barId/code', authorize, ctrl.generateStaffCode)
  .post('/bars/:barId/iban', authorize, ctrl.setIban)
  .post('/bars/:barId/menus', authorize, ctrl.createMenu)
  .delete('/bars/:barId/menus/:menuId', authorize, ctrl.deleteMenu)
  .put('/bars/:barId/menus/:menuId', authorize, ctrl.setActiveMenu);

export default router;
