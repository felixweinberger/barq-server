// import mongoose from '../../db/db';

const customerModel = {};

const mockMenu = {
  barId: 'a791xu',
  name: 'Cheers',
  currency: 'GBP',
  vat: 0.13,
  open: 'true',
  menu: [
    {
      name: 'Beers',
      items: [
        {
          name: 'Budweiser',
          price: 2.99,
        },
        {
          name: 'Coors',
          price: 3.5,
        },
      ],
    },
    {
      name: 'Cocktails',
      items: [
        {
          name: 'Dark n Stormy',
          price: 5.99,
        },
        {
          name: 'Long Island Iced Tea',
          price: 4.25,
        },
      ],
    },
  ],
};

customerModel.getMenu = barId => ({
  ...mockMenu,
  barId,
});

export default customerModel;
