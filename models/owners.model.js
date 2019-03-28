/* eslint-disable */
import bcrypt from 'bcrypt';
import shortid from 'shortid';
import mongoose from 'mongoose';

import Owner from '../schemas/owners.schema';

const { ObjectId } = mongoose.Types;

export const createOwner = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await Owner.create({ email, name, password: hashedPassword });
  return result;
};

export const deleteOwnerByEmail = async email => Owner.findOneAndDelete({ email });

export const findOwnerByEmail = async email => Owner.findOne({ email });

export const createBarForOwner = async (email, bar) => {
  await Owner.findOneAndUpdate(
    { email },
    { $push: { bars: bar } },
    { new: true },
  );
  const owner = await Owner.findOne({ email });
  return owner;
};

export const deleteBarForOwner = async (email, barId) => {
  const owner = await Owner.findOne({ email });
  const index = owner.bars.findIndex(el => el._id === barId); // eslint-disable-line
  owner.bars.splice(index, 1);
  owner.save();
  return owner;
};

export const generateStaffCodeForBar = async (email, barId) => {
  const staffCode = shortid.generate();
  const hashedStaffCode = await bcrypt.hash(staffCode, 10);
  const owner = await Owner.findOne({ email });
  owner.bars.id(barId).staffCode = hashedStaffCode; // eslint-disable-line
  owner.save();
  return staffCode;
};

export const setBarIban = async (email, barId, iban) => {
  const owner = await Owner.findOne({ email });
  owner.bars.id(barId).iban = iban;
  return iban;
};

export const createMenuForBar = async (email, barId, menu) => {
  const owner = await Owner.findOne({ email });
  const newMenu = {
    _id: ObjectId(),
    ...menu,
  };
  owner.bars.id(barId).menus.push(newMenu);
  if (owner.bars.id(barId).menus.length === 1) {
    owner.bars.id(barId).activeMenu = newMenu; // eslint-disable-line
  }
  owner.save();
  return owner;
};

export const deleteMenuForBar = async (email, barId, menuId) => {
    const owner = await Owner.findOne({ email });
    const index = owner.bars.id(barId).menus.findIndex(el => el._id.toString() === menuId); // eslint-disable-line
    owner.bars.id(barId).menus.splice(index, 1);
    if (owner.bars.id(barId).activeMenu !== null
      && owner.bars.id(barId).activeMenu._id.toString() === menuId) { // eslint-disable-line
      owner.bars.id(barId).activeMenu = null;
    }
    owner.save();
    return owner;
};

export const setActiveMenuForBar = async (email, barId, menuId) => {
    const owner = await Owner.findOne({ email });
    const menu = owner.bars.id(barId).menus.id(menuId);
    if (!owner.bars.id(barId).activeMenu) {
      owner.bars.id(barId).activeMenu = menu;
    } else {
      owner.bars.id(barId).activeMenu.set(menu);
    }
    owner.save();
    return owner;
};
