/* eslint-disable no-console */
import stripeCharger from 'stripe';

import { getQueue } from '../db/queue';
import customerModel from '../models/customer/customer.model';
import Owner from '../models/owners.model';

const stripeAccount = stripeCharger(process.env.STRIPE_SK);

export const getMenu = async (req, res) => {
  const { barId } = req.params;
  try {
    const menu = await customerModel.getMenu(barId);
    const queue = await getQueue(barId);
    menu.open = queue.open;
    res.status(200);
    res.send(menu);
  } catch (e) {
    console.log('Something went wrong while fetching the menu');
    res.status(500);
    res.send({ Error: 'Something went wrong while fetching the menu' });
  }
};

export const pay = async (req, res) => {
  const { barId } = req.params;
  const { nextOrderId } = await getQueue(barId);
  const { stripe, order } = req.body;
  try {
    await stripeAccount.charges.create(stripe);
    const total = order.items.reduce((acc, el) => acc + el.price * el.quantity, 0);
    const confirmation = {
      ...order,
      status: 'paid',
      total,
      timestamp: new Date().toISOString(),
      orderId: nextOrderId,
    };

    // asynchronously write the order to the history of the bar
    const owner = await Owner.findOne({ bars: { $elemMatch: { _id: barId } } });
    owner.bars.id(barId).history.push(confirmation);
    owner.save();

    res.status(200);
    res.send(confirmation);
  } catch (e) {
    console.log(`Something went wrong with the payment ${order}: `, e);
    res.status(500);
    res.send({ Error: 'Something went wrong with the payment' });
  }
};
