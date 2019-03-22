const Owner = require('../../models/owner/owners.model.js');

module.exports.register = (req) => {
  // do things
  // expect username and password
  const { username, password } = req.body;
  console.log(username, password);
};

module.exports.login = (/* req, res */) => {
  // do things
};

module.exports.postOne = (req, res) => {
  const { email, name } = req.user;
  Owner.create({ email, name })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating new owner: ', error));
};

module.exports.getOne = (req, res) => {
  const { email } = req.user;
  Owner.findOne({ email })
    .then(response => res.status(200).send(response))
    .catch(error => res.status(500).send('Error fetching owner data: ', error));
};

module.exports.deleteOne = (req, res) => {
  const { email } = req.user;
  Owner.findOneAndDelete({ email })
    .then(() => res.status(204).send())
    .catch(error => res.status(500).send('Error deleting owner: ', error));
};


// module.exports.getOne = (req, res) => {
//   Owner.findOne({ bars: { $elemMatch: { _id: "HgTaeiK_g" } } })
//     .then(response => res.status(200).send(response))
//     .catch(error => res.status(500).send('Error fetching owner data: ', error));
// };
