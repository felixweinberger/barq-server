import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getQueue, setQueueStatus } from '../../db/queue';

const Owner = require('../../models/owner/owners.model');

export const fetchQueue = async (req, res) => {
  const { barId } = req.params;

  // TODO: AUTHORIZE THE STAFF MEMBER FOR THIS BAR
  const queue = await getQueue(barId);

  // send back the current queue
  res.status(200);
  res.send(queue);
};

export const setBarStatus = async (req, res) => {
  const { barId } = req.params;
  const { open } = req.body;

  // TODO: AUTHORIZE THE STAFF MEMBER FOR THIS BAR
  const queue = await setQueueStatus(barId, open);

  // send back the current queue
  res.status(200);
  res.send(queue);
};

export const checkCode = async (req, res) => {
  try {
    const hash = req.headers.authorization.split(' ')[1];
    const decoded = Buffer.from(hash, 'base64').toString();
    const [barId, staffCode] = decoded.split(':');
    const owner = await Owner.findOne({ bars: { $elemMatch: { _id: barId } } });
    const bar = owner.bars.filter(el => barId === el._id)[0]; // eslint-disable-line
    const isCorrectCode = await bcrypt.compare(staffCode, bar.staffCode);
    if (!isCorrectCode) throw new Error();
    const token = jwt.sign({ barId, staffCode }, process.env.JWT_SK);
    res.status(200).send({ token });
  } catch (e) {
    res.status(401).send('Error checking the staff code.');
  }
};
