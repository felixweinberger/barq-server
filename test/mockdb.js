/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import Owner from '../models/owner/owners.model';

const mockOwner = async () => ({
  _id: '5c929f783aa09401c2420986',
  email: 'egillh210@gmail.com',
  name: 'Egill Hreinsson',
  password: await bcrypt.hash('yo', 10),
  bars: [
    {
      menus: [
        {
          categories: [
            {
              items: [
                {
                  _id: '5c929fdcc7189a01db2d749f',
                  name: 'Estrella',
                  price: 3,
                },
                {
                  _id: '5c929fdcc7189a01db2d749e',
                  name: 'Corona',
                  price: 3.5,
                },
              ],
              _id: '5c929fdcc7189a01db2d749d',
              name: 'Beers',
            },
            {
              items: [
                {
                  _id: '5c929fdcc7189a01db2d749c',
                  name: 'Diet Coke',
                  price: 2.2,
                },
                {
                  _id: '5c929fdcc7189a01db2d749b',
                  name: 'Still Water',
                  price: 2,
                },
              ],
              _id: '5c929fdcc7189a01db2d749a',
              name: 'Cold drinks',
            },
          ],
          _id: '5c929fdcc7189a01db2d7499',
          name: 'Standard Menu',
        },
      ],
      staff: [
        {
          _id: '5c92a0975e43b001fe955e0c',
          name: 'Felix Weinberger',
          email: 'felix@cwbar.com',
        },
      ],
      name: 'Codeworks Bar',
      currency: 'EUR',
      vat: 0.21,
      _id: 'lRMzbkZEn',
    },
  ],
  __v: 2,
});

const seedDb = async () => {
  const res = await Owner.create(await mockOwner());
  return res;
};

(async () => {
  const res = await seedDb();
  console.log(res);
  process.exit(0);
})();
