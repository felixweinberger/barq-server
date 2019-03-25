/* eslint-disable no-console */

import stripeCharger from 'stripe';
import { getQueue } from '../../db/queue';
import customerModel from '../../models/customer/customer.model';

const customerCtrl = {};

const stripeAccount = stripeCharger(process.env.STRIPE_SK);

customerCtrl.getMenu = async (req, res) => {
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

customerCtrl.pay = async (req, res) => {
  const { barId } = req.params;
  const { nextOrderId } = await getQueue(barId);
  const { stripe, order } = req.body;
  try {
    await stripeAccount.charges.create(stripe);
    const confirmation = {
      ...order,
      status: 'paid',
      orderId: nextOrderId,
    };
    res.status(200);
    res.send(confirmation);
  } catch (e) {
    console.log(`Something went wrong with the payment ${order}: `, e);
    res.status(500);
    res.send({ Error: 'Something went wrong with the payment' });
  }
};

export default customerCtrl;
