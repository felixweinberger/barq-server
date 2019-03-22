const Owner = require('../../models/owner/owners.model.js');

module.exports.postOne = (req, res) => {
  const { email } = req.user;
  const newBar = req.body;
  Owner.findOneAndUpdate({ email }, { $push: { bars: newBar } }, { new: true })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating new bar: ', error));
};

module.exports.deleteOne = (req, res) => {
  const { email } = req.user;
  Owner.findOneAndUpdate(
    { email }, { $pull: { bars: { _id: req.params.barId } } }, { new: true },
  )
    .then(response => res.status(201).send(response))
    .catch(() => res.status(500).send('Error deleting bar.'));
};
