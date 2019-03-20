/* eslint-disable no-console */
import customerCtrl from '../models/customer/customer.model';

const queues = {};

export const createQueue = async (barId) => {
  try {
    const {
      name,
      currency,
      vat,
      open,
    } = await customerCtrl.getMenu(barId);

    const newQueue = {
      barId,
      name,
      currency,
      vat,
      open,
      queue: [],
      history: [],
    };

    queues[barId] = newQueue;
    return queues[barId];
  } catch (error) {
    console.error('Something went wrong creating the queue: ', error);
    return 1;
  }
};

export const getQueue = async (barId) => {
  let queue = queues[barId];
  if (!queue) queue = await createQueue(barId);
  return queue;
};

export const addToQueue = async (barId, order) => {
  const queue = await getQueue(barId);
  queue.queue.push(order);
  console.log(queue);
  return queue;
};

export const updateOrderStatus = async (barId, orderId, newStatus) => {
  const queue = await getQueue(barId);
  queue.queue.forEach((el, i) => {
    if (el.orderId === orderId) {
      queue.queue[i].status = newStatus;
      if (newStatus === 'delivered') {
        queue.history.push(queue.queue.splice(i, 1)[0]);
      }
    }
  });
  console.log(queue);
  return queue;
};

export const setQueueStatus = async (barId, newStatus) => {
  const queue = await getQueue(barId);
  queue.open = newStatus;
  console.log(queue);
  return queues[barId];
};
