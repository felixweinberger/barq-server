import { getQueue, setQueueStatus } from '../../db/queue';

export const fetchQueue = async (req, res) => {
  const { barId } = req.params;

  // TODO: AUTHORIZE THE STAFF MEMBER FOR THIS BAR
  const queue = await getQueue(barId);

  // send back the current queue
  res.status(200);
  res.send(queue);
};

export const setBarStatus = (req, res) => {
  const { barId } = req.params;
  const { open } = req.body;

  // TODO: AUTHORIZE THE STAFF MEMBER FOR THIS BAR
  const queue = setQueueStatus(barId, open);

  // send back the current queue
  res.status(200);
  res.send(queue);
};
