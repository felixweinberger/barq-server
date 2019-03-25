import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Owner = require('../../models/owner/owners.model.js');

module.exports.register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await Owner.create({ email, name, password: hashedPassword });
    res.status(201).send(response);
  } catch (e) {
    res.status(401).send('Error creating new owner');
  }
};

module.exports.login = async (req, res) => {
  try {
    const hash = req.headers.authorization.split(' ')[1];
    const decoded = Buffer.from(hash, 'base64').toString();
    const [email, password] = decoded.split(':');
    const user = await Owner.findOne({ email });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error();
    const token = jwt.sign({ user }, process.env.JWT_SK);
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(401).send('Error logging in.');
  }
};

module.exports.me = async (req, res) => {
  try {
    const hash = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(hash, process.env.JWT_SK);
    const { user } = decoded;
    const response = await Owner.findOne({ email: user.email });
    res.status(200).send({ user: response });
  } catch (e) {
    res.status(401).send('Error authorizing.');
  }
};

module.exports.deleteOne = (req, res) => {
  const { email } = req.user;
  Owner.findOneAndDelete({ email })
    .then(() => res.status(204).send())
    .catch(error => res.status(500).send('Error deleting owner: ', error));
};
