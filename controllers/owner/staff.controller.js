const Owner = require('../../models/owner/owners.model.js');

module.exports.postOne = (req, res) => {
  const email = 'rachel@abar.com';
  const { barId } = req.params;
  const newStaff = JSON.parse(req.body);
  Owner.findOne({ email })
    .then((data) => {
      data.bars.id(barId).staff.push(newStaff);
      data.save();
    })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating bar: ', error));
};
// can't return updated.

module.exports.deleteOne = (req, res) => {
  const email = 'rachel@abar.com';
  const { barId, staffId } = req.params;
  Owner.findOne({ email })
    .then((data) => {
      const index = data.bars.id(barId).staff.findIndex(el => el._id.toString() === staffId); //eslint-disable-line
      data.bars.id(barId).staff.splice(index, 1);
      data.save();
    })
    .then(response => res.status(204).send(response))
    .catch(error => res.status(500).send('Error posting bar: ', error));
};
