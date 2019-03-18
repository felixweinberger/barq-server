import customerModel from '../../models/customer';

const ctrl = {};

ctrl.getMenu = async (req, res) => {
  const { barId } = req.params;
  console.log('barId: ', barId);
  customerModel.getMenu(barId);
  res.sendStatus(200);
};

ctrl.pay = async (req, res) => {
  const { barId } = req.params;
  console.log('barId: ', barId);
  res.sendStatus(200);
};

export default ctrl;
