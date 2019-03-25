const Owner = require('../../models/owner/owners.model');

module.exports.postOne = (req, res) => {
  const { email } = req.user;
  const { barId } = req.params;
  const newStaff = req.body;
  Owner.findOne({ email })
    .then((data) => {
      data.bars.id(barId).staff.push(newStaff);
      data.save();
      return data;
    })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating bar: ', error));
};

module.exports.deleteOne = (req, res) => {
  const { email } = req.user;
  const { barId, staffId } = req.params;
  Owner.findOne({ email })
    .then((data) => {
      const index = data.bars.id(barId).staff.findIndex(el => el._id.toString() === staffId); //eslint-disable-line
      data.bars.id(barId).staff.splice(index, 1);
      data.save();
      return data;
    })
    .then(response => res.status(204).send(response))
    .catch(error => res.status(500).send('Error posting bar: ', error));
};
