import ctrl from '../controllers/owner';

const router = require('express').Router();

router
  .post('/', ctrl.owner.postOne)
  .get('/', ctrl.owner.getOne)
  .delete('/', ctrl.owner.deleteOne)

  .get('/bar', ctrl.bars.getAll)
  .post('/bar', ctrl.bars.postOne)
  .delete('/bar/:barId', ctrl.bars.deleteOne)

  .post('/bar/:barId/menu', ctrl.menu.postOne)
  .delete('/bar/:barId/menu/:menuId', ctrl.menu.deleteOne)

  .post('/bar/:barId/staff', ctrl.staff.postOne)
  .delete('/bar/:barId/staff/:staffId', ctrl.staff.deleteOne);

module.exports = router;
