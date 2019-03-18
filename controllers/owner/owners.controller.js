const Owner = require('../../models/owner/owners.model.js');

const ownerCtrl = {};

ownerCtrl.postOne = (req, res) => {
  Owner.create(req.body)
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating new owner: ', error));
};

ownerCtrl.getOne = (req, res) => {
  Owner.find(req.body)
    .then(response => res.status(200).send(response))
    .catch(error => res.status(500).send('Error fetching owner data: ', error));
};

ownerCtrl.deleteOne = (req, res) => {
  Owner.deleteOne({ userId: req.user.id })
    .then(response => res.sendStatus()) //eslint-disable-line
    .catch(error => res.status(500).send('Error deleting owner: ', error));
};

module.exports = ownerCtrl;
// is this the correct way to access req.user?
