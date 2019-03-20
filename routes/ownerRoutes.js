import ctrl from '../controllers/owner';
import { authorize } from '../middleware/authorization';
// const jwt = require('express-jwt');

const router = require('express').Router();

router
  .post('/', ctrl.owner.postOne)
  .get('/', authorize, ctrl.owner.getOne)
  .delete('/', authorize, ctrl.owner.deleteOne)
  .post('/bars', authorize, ctrl.bars.postOne)
  .delete('/bars/:barId', authorize, ctrl.bars.deleteOne)
  .post('/bars/:barId/menus', authorize, ctrl.menu.postOne)
  .delete('/bars/:barId/menus/:menuId', authorize, ctrl.menu.deleteOne)
  .put('/bars/:barId/menus/:menuId', authorize, ctrl.menu.makeActive)
  .post('/bars/:barId/staff', authorize, ctrl.staff.postOne)
  .delete('/bars/:barId/staff/:staffId', authorize, ctrl.staff.deleteOne);

module.exports = router;


/* eslint-disable */
/*
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qY3pOVEV6T1RKRE4wTXlRMEZDTURJeE56TTVRMEU1UWpaRk5qWTROVE5FUXpSQ09EUXhNQSJ9.eyJnaXZlbl9uYW1lIjoiRWdpbGwiLCJmYW1pbHlfbmFtZSI6IkhyZWluc3NvbiIsIm5pY2tuYW1lIjoiZWdpbGxoMjEwIiwibmFtZSI6IkVnaWxsIEhyZWluc3NvbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTVZVmVodUQ1QXRRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFjL1R6UG1fV3duSElJL3Bob3RvLmpwZyIsImxvY2FsZSI6ImlzIiwidXBkYXRlZF9hdCI6IjIwMTktMDMtMTlUMTc6NTA6NTkuMjk2WiIsImVtYWlsIjoiZWdpbGxoMjEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1mNG5jNzI0ZC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDcwNjk4Mjc2ODMzNzc5MzY0MzQiLCJhdWQiOiJQUWhzdXlTd3c3cWNBbnlMUmFWbGQxTzVmWXh6UjhCYiIsImlhdCI6MTU1MzAxNzg2MCwiZXhwIjoxNTUzMDUzODYwLCJhdF9oYXNoIjoia3RFekhacE9hRGd4NFNScVJEYmdfdyIsIm5vbmNlIjoiNzZYcm9Hdlh4dFU2Uzl6M2NmOHBUWDdJTzAwbDgyeUQifQ.4QuX5elDwvi3N23NhzONjqZ6f2rMkVsVllEsko7q5wh2CtLeAUwY8dCjxgNXXFAPFWJKoTrpcRO2U9lQFoKDvxT6aOr2NQbw4nUGoPDFTrZ7u3TstEDc-ARdYQd05-cXtisuRxeFOfOSz30-Oft5-5AOxrfoU9ZNN5wJc2UkCPDZbFyR2McDYQR6I5C8fp9FZI3AXuTsDDAS4zZPIY63fz1y-uTRoVQSHVVPVLQT88Uymns9UBj79pMZJYuS-hdOH4-wkpUdjCaHbRBkSaw495YFcKXILjc8l9sM2oKc3ngb6OgLyNPaguyiFfHM-gsU460jMszgse7lZJPwEflRiA
*/
