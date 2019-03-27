import jwt from 'jsonwebtoken';

import { checkStaffCodeByBar } from '../models/bars.model';
import { getQueue, setQueueStatus } from '../models/queues.model';

export const fetchQueue = async (req, res) => {
  try {
    const { barId } = req.params;
    const queue = await getQueue(barId);
    res.status(200);
    res.send(queue);
  } catch (e) {
    res.status(401).send('Error fetching the queue.');
  }
};

export const setBarStatus = async (req, res) => {
  try {
    const { barId } = req.params;
    const { open } = req.body;
    const queue = await setQueueStatus(barId, open);
    res.status(200);
    res.send(queue);
  } catch (e) {
    res.status(401).send('Error changing the bar status.');
  }
};

export const checkStaffCode = async (req, res) => {
  try {
    const hash = req.headers.authorization.split(' ')[1];
    const decoded = Buffer.from(hash, 'base64').toString();
    const [barId, staffCode] = decoded.split(':');
    const isCorrectCode = await checkStaffCodeByBar(barId, staffCode);
    if (!isCorrectCode) throw new Error();
    const token = jwt.sign({ barId, staffCode }, process.env.JWT_SK);
    res.status(200).send({ token });
  } catch (e) {
    res.status(401).send('Error checking the staff code.');
  }
};
