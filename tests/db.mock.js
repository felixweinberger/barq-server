/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import Owner from '../schemas/owners.schema';

const mockOwner = async () => ({
  _id: '5c9a0b57f3ddc20180f0555f',
  email: 'example@bar.com',
  name: 'Joe Example',
  password: await bcrypt.hash('secret', 10),
  bars: [{
    name: 'Joe\'s Bar',
    currency: 'EUR',
    _id: 'ebba12',
    history: [{
      _id: '5c9a16441d198b01e861c1f7',
      items: [{
        _id: '5c9a158c1d198b01e861c1f6',
        name: 'lager',
        price: 3,
        quantity: 3,
      }],
      total: 9,
      status: 'paid',
      timestamp: '2019-03-26T12:08:36.366Z',
      orderId: 1,
    }, {
      _id: '5c9a17521d198b01e861c1f9',
      items: [{
        _id: '5c9a158c1d198b01e861c1f3',
        name: 'white wine',
        price: 3,
        quantity: 4,
      }],
      total: 12,
      status: 'paid',
      timestamp: '2019-03-26T12:13:06.579Z',
      orderId: 2,
    }, {
      _id: '5c9a1ae11d198b01e861c1fb',
      items: [{
        _id: '5c9a158c1d198b01e861c1f6',
        name: 'lager',
        price: 3,
        quantity: 3,
      }],
      total: 9,
      status: 'paid',
      timestamp: '2019-03-26T12:28:17.923Z',
      orderId: 3,
    }, {
      _id: '5c9a2b271d198b01e861c1fd',
      items: [{
        _id: '5c9a158c1d198b01e861c1f4',
        name: 'red wine',
        price: 4,
        quantity: 3,
      }, {
        _id: '5c9a158c1d198b01e861c1f3',
        name: 'white wine',
        price: 3,
        quantity: 1,
      }],
      total: 15,
      status: 'paid',
      timestamp: '2019-03-26T13:37:43.380Z',
      orderId: 4,
    }],
    menus: [{
      _id: '5c9a158c1d198b01e861c1ef',
      name: 'Standard menu',
      categories: [{
        _id: '5c9a158c1d198b01e861c1f5',
        name: 'beers',
        items: [{
          _id: '5c9a158c1d198b01e861c1f6',
          name: 'lager',
          price: 3,
        }],
      }, {
        _id: '5c9a158c1d198b01e861c1f2',
        name: 'wines',
        items: [{
          _id: '5c9a158c1d198b01e861c1f4',
          name: 'red wine',
          price: 4,
        }, {
          _id: '5c9a158c1d198b01e861c1f3',
          name: 'white wine',
          price: 3,
        }],
      }, {
        _id: '5c9a158c1d198b01e861c1f0',
        name: 'cocktails',
        items: [{
          _id: '5c9a158c1d198b01e861c1f1',
          name: 'cosmo',
          price: 6,
        }],
      }],
    },
    {
      _id: '5c9a158c1d198b01e861c1ef',
      name: 'Fancy menu',
      categories: [{
        _id: '5c9a158c1d198b01e861c1f5',
        name: 'beers',
        items: [{
          _id: '5c9a158c1d198b01e861c1f6',
          name: 'lager',
          price: 3,
        }],
      }, {
        _id: '5c9a158c1d198b01e861c1f2',
        name: 'wines',
        items: [{
          _id: '5c9a158c1d198b01e861c1f4',
          name: 'red wine',
          price: 4,
        }, {
          _id: '5c9a158c1d198b01e861c1f3',
          name: 'white wine',
          price: 3,
        }],
      }, {
        _id: '5c9a158c1d198b01e861c1f0',
        name: 'cocktails',
        items: [{
          _id: '5c9a158c1d198b01e861c1f1',
          name: 'cosmo',
          price: 6,
        }],
      }],
    }],
    activeMenu: {
      _id: '5c9a158c1d198b01e861c1ef',
      name: 'Standard menu',
      categories: [{
        _id: '5c9a158c1d198b01e861c1f5',
        name: 'beers',
        items: [{
          _id: '5c9a158c1d198b01e861c1f6',
          name: 'lager',
          price: 3,
        }],
      }, {
        _id: '5c9a158c1d198b01e861c1f2',
        name: 'wines',
        items: [{
          _id: '5c9a158c1d198b01e861c1f4',
          name: 'red wine',
          price: 4,
        }, {
          _id: '5c9a158c1d198b01e861c1f3',
          name: 'white wine',
          price: 3,
        }],
      }, {
        _id: '5c9a158c1d198b01e861c1f0',
        name: 'cocktails',
        items: [{
          _id: '5c9a158c1d198b01e861c1f1',
          name: 'cosmo',
          price: 6,
        }],
      }],
    },
    staff: [],
    iban: 'ABC1234DE5678FG',
    staffCode: '',
  }],
  __v: 5,
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

export default seedDb;
