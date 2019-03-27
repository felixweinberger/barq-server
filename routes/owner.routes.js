import ctrl from '../controllers/owner.ctrl';
import authorize from '../middleware/authorization';

const router = require('express').Router();

router
  .post('/', ctrl.registerOwner)
  .get('/', ctrl.loginOwner)
  .get('/me', ctrl.authorizeOwner)
  .delete('/', authorize, ctrl.deleteOwner)
  .post('/bars', authorize, ctrl.createBar)
  .delete('/bars/:barId', authorize, ctrl.deleteBar)
  .get('/bars/:barId/code', authorize, ctrl.generateStaffCode)
  .post('/bars/:barId/iban', authorize, ctrl.setBarIban)
  .post('/bars/:barId/menus', authorize, ctrl.createMenu)
  .delete('/bars/:barId/menus/:menuId', authorize, ctrl.deleteMenu)
  .put('/bars/:barId/menus/:menuId', authorize, ctrl.setActiveMenu);

export default router;
