import ctrl from '../controllers/owner';

const router = require('express').Router();

router
  .post('/', ctrl.owner.postOne)
  .get('/', ctrl.owner.getOne)
  .delete('/', ctrl.owner.deleteOne)
  .get('/bars', ctrl.bars.getAll)
  .post('/bars', ctrl.bars.postOne)
  .delete('/bars/:barId', ctrl.bars.deleteOne)
  .post('/bars/:barId/menus', ctrl.menu.postOne)
  .delete('/bars/:barId/menus/:menuId', ctrl.menu.deleteOne)
  .post('/bars/:barId/staff', ctrl.staff.postOne)
  .delete('/bars/:barId/staff/:staffId', ctrl.staff.deleteOne);

module.exports = router;
