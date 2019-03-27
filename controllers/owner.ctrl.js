import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createOwner,
  findOwnerByEmail,
  deleteOwnerByEmail,
  createBarForOwner,
  deleteBarForOwner,
  generateStaffCodeForBar,
  setBarIban,
} from '../models/owners.model';

import Owner from '../schemas/owners.schema';

// Owner registration & login
module.exports.registerOwner = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const result = await createOwner(email, name, password);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error creating new owner');
  }
};

module.exports.loginOwner = async (req, res) => {
  try {
    const hash = req.headers.authorization.split(' ')[1];
    const decoded = Buffer.from(hash, 'base64').toString();
    const [email, password] = decoded.split(':');
    const user = await findOwnerByEmail(email);
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error();
    const token = jwt.sign({ user }, process.env.JWT_SK);
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(401).send('Error logging in.');
  }
};

module.exports.authorizeOwner = async (req, res) => {
  try {
    const hash = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(hash, process.env.JWT_SK);
    const { user } = decoded;
    const response = await findOwnerByEmail(user.email);
    res.status(200).send({ user: response });
  } catch (e) {
    res.status(401).send('Error authorizing.');
  }
};

module.exports.deleteOwner = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await deleteOwnerByEmail(email);
    res.status(204).send(result);
  } catch (e) {
    res.status(500).send('Error deleting owner.');
  }
};

// Bar creation and modification
module.exports.createBar = async (req, res) => {
  try {
    const { email } = req.user;
    const newBar = req.body;
    const result = await createBarForOwner(email, newBar);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error creating new bar.');
  }
};

module.exports.deleteBar = async (req, res) => {
  try {
    const { email } = req.user;
    const newBar = req.body;
    const result = await deleteBarForOwner(email, newBar);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error deleting bar.');
  }
};

module.exports.generateStaffCode = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId } = req.params;
    const staffCode = await generateStaffCodeForBar(email, barId);
    res.status(201).send(JSON.stringify(staffCode));
  } catch (e) {
    res.status(500).send('Error generating staff code.');
  }
};

module.exports.setBarIban = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId } = req.params;
    const { iban } = req.body;
    await setBarIban(email, barId, iban);
    res.status(201).send(JSON.stringify(iban));
  } catch (e) {
    res.status(500).send('Error setting IBAN.');
  }
};

// Menu creation and modification
module.exports.createMenu = (req, res) => {
  const { email } = req.user;
  const { barId } = req.params;
  const newMenu = req.body;
  Owner.findOne({ email })
    .then((data) => {
      data.bars.id(barId).menus.push(newMenu);
      if (data.bars.id(barId).menus.length === 1) {
        data.bars.id(barId).activeMenu = newMenu; // eslint-disable-line
      }
      data.save();
      return data;
    })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating bar: ', error));
};

module.exports.deleteMenu = (req, res) => {
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

module.exports.setActiveMenu = (req, res) => {
  const { email } = req.user;
  const { barId, menuId } = req.params;
  Owner.findOne({ email })
    .then((data) => {
      const menu = data.bars.id(barId).menus.id(menuId);
      data.bars.id(barId).activeMenu = menu; // eslint-disable-line
      data.save();
      return data;
    })
    .then(response => res.status(201).send(response))
    .catch(error => res.status(500).send('Error creating bar: ', error));
};
