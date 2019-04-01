/* eslint-disable no-console */
import { getActiveMenu } from './bars.model';

const queues = {};

export const createQueue = async (barId) => {
  try {
    const {
      name,
      currency,
      open,
    } = await getActiveMenu(barId);

    const newQueue = {
      barId,
      name,
      currency,
      open,
      nextOrderId: 0,
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
  try {
    let queue = queues[barId];
    if (!queue) queue = await createQueue(barId);
    return queue;
  } catch (e) {
    console.error('Error in getQueue:', e);
    return { Error: 'Could not get queue.' };
  }
};

export const getOrder = async (barId, orderId) => {
  try {
    const queue = queues[barId];
    if (!queue) return null;
    const foundOrder = queue.queue.find(order => order.orderId === orderId);
    return foundOrder || null;
  } catch (e) {
    console.error('Error in getOrder:', e);
    return { Error: 'Could not get order.' };
  }
};

export const addToQueue = async (barId, order) => {
  try {
    const queue = await getQueue(barId);
    if (queue.queue.find(ord => ord.orderId === order.orderId)) return null;
    queue.queue.push(order);
    queue.nextOrderId += 1;
    return queue;
  } catch (e) {
    console.error('Error in addToQueue:', e);
    return { Error: 'Could not add order to queue.' };
  }
};

export const getOrderStatus = async (barId, orderId) => {
  try {
    const queue = await getQueue(barId);
    const foundOrder = queue.queue
      .find(order => order.orderId === Number(orderId));
    if (foundOrder) return foundOrder.status;
    return null;
  } catch (e) {
    console.error('Error in getOrderStatus:', e);
    return { Error: 'Could not get order status.' };
  }
};

export const updateOrderStatus = async (barId, orderId, newStatus) => {
  try {
    const queue = await getQueue(barId);
    queue.queue.forEach((el, i) => {
      if (el.orderId === orderId) {
        queue.queue[i].status = newStatus;
      }
    });
    return queue;
  } catch (e) {
    console.error('Error in updateOrderStatus:', e);
    return { Error: 'Could not get order status.' };
  }
};

export const getOrderId = async (barId) => {
  try {
    const queue = await getQueue(barId);
    queue.nextOrderId += 1;
    return queue.nextOrderId;
  } catch (e) {
    console.error('Error in getOrderId:', e);
    return { Error: 'Could not get order ID.' };
  }
};

export const setQueueStatus = async (barId, newStatus) => {
  try {
    const queue = await getQueue(barId);
    queue.open = newStatus;
    return queues[barId];
  } catch (e) {
    console.error('Error in setQueueStatus:', e);
    return { Error: 'Could not set queue status.' };
  }
};
