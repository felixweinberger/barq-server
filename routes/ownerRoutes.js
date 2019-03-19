import ctrl from '../controllers/owner';
import { authorize } from '../middleware/authorization';

const router = require('express').Router();

router
  .post('/', ctrl.owner.postOne)
  .get('/', authorize, ctrl.owner.getOne)
  .delete('/', authorize, ctrl.owner.deleteOne)
  .post('/bars', authorize, ctrl.bars.postOne)
  .delete('/bars/:barId', authorize, ctrl.bars.deleteOne)
  .post('/bars/:barId/menus', authorize, ctrl.menu.postOne)
  .delete('/bars/:barId/menus/:menuId', authorize, ctrl.menu.deleteOne)
  .post('/bars/:barId/staff', authorize, ctrl.staff.postOne)
  .delete('/bars/:barId/staff/:staffId', authorize, ctrl.staff.deleteOne);

module.exports = router;
