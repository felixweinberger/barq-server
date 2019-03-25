/* eslint-disable no-console */
import customerCtrl from '../models/customer/customer.model';

const queues = {};

export const createQueue = async (barId) => {
  try {
    const {
      name,
      currency,
      open,
    } = await customerCtrl.getMenu(barId);

    const newQueue = {
      barId,
      name,
      currency,
      open,
      nextOrderId: 1,
      queue: [],
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

export const getOrder = async (barId, orderId) => {
  const queue = queues[barId];
  if (!queue) return null;
  const foundOrder = queue.queue.find(order => order.orderId === orderId);
  return foundOrder || null;
};

export const addToQueue = async (barId, order) => {
  const queue = await getQueue(barId);
  if (queue.queue.find(ord => ord.orderId === order.orderId)) return null;
  queue.queue.push(order);
  queue.nextOrderId += 1;
  return queue;
};

export const getOrderStatus = async (barId, orderId) => {
  const queue = await getQueue(barId);
  const foundOrder = queue.queue
    .find(order => order.orderId === Number(orderId));
  if (foundOrder) return foundOrder.status;
  return null;
};

export const updateOrderStatus = async (barId, orderId, newStatus) => {
  const queue = await getQueue(barId);
  queue.queue.forEach((el, i) => {
    if (el.orderId === orderId) {
      queue.queue[i].status = newStatus;
    }
  });
  return queue;
};

export const setQueueStatus = async (barId, newStatus) => {
  const queue = await getQueue(barId);
  queue.open = newStatus;
  return queues[barId];
};
