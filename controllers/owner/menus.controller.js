const Owner = require('../../models/owner/owners.model.js');

module.exports.postOne = (req, res) => {
  const { email } = req.user;
  const { barId } = req.params;
  const newMenu = req.body;
  Owner.findOne({ email })
    .then((data) => {
      data.bars.id(barId).menus.push(newMenu);
      data.save();
      return data;
    })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating bar: ', error));
};

module.exports.deleteOne = (req, res) => {
  const { email } = req.user;
  const { barId, menuId } = req.params;
  Owner.findOne({ email })
    .then((data) => {
      const index = data.bars.id(barId).menus.findIndex(el => el._id.toString() === menuId); //eslint-disable-line
      data.bars.id(barId).menus.splice(index, 1);
      data.save();
      return data;
    })
    .then(response => res.status(204).send(response))
    .catch(error => res.status(500).send('Error posting bar: ', error));
};

module.exports.makeActive = (req, res) => {
  const { email } = req.user;
  const { barId, menuId } = req.params;
  Owner.findOne({ email })
    .then((data) => {
      const menu = data.bars.id(barId).menus.id(menuId);
      data.bars.id(barId).activeMenu = menu; //eslint-disable-line
      data.save();
      return data;
    })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating bar: ', error));
};
