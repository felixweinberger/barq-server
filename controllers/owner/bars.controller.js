const Owner = require('../../models/owner/owners.model.js');

module.exports.postOne = (req, res) => {
  const email = 'rachel@cwbar.com';
  const newBar = req.body;
  Owner.findOneAndUpdate({ email }, { $push: { bars: newBar } }, { new: true })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating new bar: ', error));
};

module.exports.deleteOne = (req, res) => {
  const email = 'rachel@cwbar.com';
  Owner.findOneAndUpdate({ email }, { $pull: { bars: { _id: req.params.barId } } }, { new: true })
    .then(() => res.status(201).send())
    .catch(error => res.status(500).send('Error deleting bar: ', error));
};
