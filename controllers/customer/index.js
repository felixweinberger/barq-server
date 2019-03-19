/* eslint-disable no-console */

import stripeCharger from 'stripe';
import customerModel from '../../models/customer/customer.model';

const customerCtrl = {};

const stripeAccount = stripeCharger(process.env.STRIPE_KEY);

const mockPaymentConfirmation = {
  orderId: null,
  status: 'paid',
  items: [
    {
      name: 'Corona',
      price: 3.6,
      quantity: 2,
    },
    {
      name: 'Becks',
      price: 3.4,
      quantity: 1,
    },
  ],
};

customerCtrl.getMenu = async (req, res) => {
  const { barId } = req.params;
  try {
    const menu = await customerModel.getMenu(barId);
    res.status(200);
    res.send(menu);
  } catch (e) {
    console.log('Something went wrong while fetching the menu');
    res.status(500);
    res.send({ Error: 'Something went wrong with the payment' });
  }
};

customerCtrl.pay = async (req, res) => {
  const { stripe, order } = req.body;
  try {
    await stripeAccount.charges.create({ stripe });
    const orderConfirmation = {
      ...mockPaymentConfirmation,
      orderId: Math.floor(Math.random() * 1000),
    };
    res.status(200);
    res.send(orderConfirmation);
  } catch (e) {
    console.log(`Something went wrong with the payment ${order}: `, e);
    res.status(500);
    res.send({ Error: 'Something went wrong with the payment' });
  }
};

export default customerCtrl;
