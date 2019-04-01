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
  createMenuForBar,
  deleteMenuForBar,
  setActiveMenuForBar,
} from '../models/owners.model';

export const registerOwner = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const result = await createOwner(email, name, password);
    res.status(201).send(result);
  } catch (e) {
    res.status(401).send('Error creating new owner');
  }
};

export const loginOwner = async (req, res) => {
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

export const authorizeOwner = async (req, res) => {
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

export const deleteOwner = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await deleteOwnerByEmail(email);
    res.status(204).send(result);
  } catch (e) {
    res.status(500).send('Error deleting owner.');
  }
};

export const createBar = async (req, res) => {
  try {
    const { email } = req.user;
    const newBar = req.body;
    const result = await createBarForOwner(email, newBar);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error creating new bar.');
  }
};

export const deleteBar = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId } = req.params;
    const result = await deleteBarForOwner(email, barId);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error deleting bar.');
  }
};

export const generateStaffCode = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId } = req.params;
    const staffCode = await generateStaffCodeForBar(email, barId);
    res.status(201).send(JSON.stringify(staffCode));
  } catch (e) {
    res.status(500).send('Error generating staff code.');
  }
};

export const setIban = async (req, res) => {
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

export const createMenu = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId } = req.params;
    const newMenu = req.body;
    const result = await createMenuForBar(email, barId, newMenu);
    res.status(201).send(JSON.stringify(result));
  } catch (e) {
    res.status(500).send('Error creating menu.');
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId, menuId } = req.params;
    await deleteMenuForBar(email, barId, menuId);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send('Error deleting menu.');
  }
};

export const setActiveMenu = async (req, res) => {
  try {
    const { email } = req.user;
    const { barId, menuId } = req.params;
    const result = await setActiveMenuForBar(email, barId, menuId);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error changing active menu.');
  }
};
