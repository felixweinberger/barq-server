const ownerCtrl = {};

ownerCtrl.owner = require('./owners.controller.js');
ownerCtrl.bars = require('./bars.controller.js');
ownerCtrl.menu = require('./menus.controller.js');
ownerCtrl.staff = require('./staff.controller.js');

export default ownerCtrl;
