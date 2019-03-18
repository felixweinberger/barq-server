/* eslint-disable no-console */
import shortid from 'shortid';

import mongoose from '../../db/db';

const { ObjectId } = mongoose.Schema.Types;

const Item = new mongoose.Schema({
  name: String,
  price: Number,
}, { id: false });

const Category = new mongoose.Schema({
  name: String,
  items: [Item],
}, { id: false });

const Menu = new mongoose.Schema({
  menuId: Number,
  name: String,
  categories: [Category],
}, { id: false });

const Staff = new mongoose.Schema({
  staffId: Number,
  name: String,
  email: String,
});

const Bar = new mongoose.Schema({
  barId: { type: String, default: shortid.generate },
  name: String,
  currency: String,
  menus: [Menu],
  staff: [Staff],
});

const ownerSchema = new mongoose.Schema({
  userId: ObjectId,
  email: String,
  bars: [Bar],
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
