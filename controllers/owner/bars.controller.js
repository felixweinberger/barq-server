const Owner = require('../../models/owner/owners.model.js');

module.exports.getAll = (req, res) => {
  // const { email } = req.email --->
  // needs to be updated throughout all controllers once authorization middleware is functional;
  const email = 'rachel@abar.com';
  Owner.findOne({ email })
    .then(response => res.status(200).send(response))
    .catch(error => res.status(500).send('Error fetching owner data: ', error));
};

module.exports.postOne = (req, res) => {
  const email = 'rachel@abar.com';
  const newBar = JSON.parse(req.body);
  Owner.findOneAndUpdate({ email }, { $push: { bars: newBar } }, { new: true })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating new bar: ', error));
};

module.exports.deleteOne = (req, res) => {
  const email = 'rachel@abar.com';
  Owner.findOneAndUpdate({ email }, { $pull: { bars: { _id: req.params.barId } } }, { new: true })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error deleting bar: ', error));
};
