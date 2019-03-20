import { getQueue } from '../../db/queue';

const fetchQueue = async (barId) => {
  const queue = await getQueue(barId);
  return queue;
};

export default fetchQueue;
