/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import shortid from 'shortid';
import mongoose from 'mongoose';

import Owner from '../schemas/owners.schema';

const { ObjectId } = mongoose.Types;

export const createOwner = async (email, name, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Owner.create({ email, name, password: hashedPassword });
    return result;
  } catch (e) {
    console.error('Error in createOwner:', e);
    return { Error: 'Could not create owner.' };
  }
};

export const deleteOwnerByEmail = async (email) => {
  try {
    return Owner.findOneAndDelete({ email });
  } catch (e) {
    console.error('Error in deleteOwnerByEmail:', e);
    return { Error: 'Could not delete owner.' };
  }
};

export const findOwnerByEmail = async (email) => {
  try {
    return Owner.findOne({ email });
  } catch (e) {
    console.error('Error in findOwnerByEmail:', e);
    return { Error: 'Could not find owner.' };
  }
};

export const createBarForOwner = async (email, bar) => {
  try {
    await Owner.findOneAndUpdate(
      { email },
      { $push: { bars: bar } },
      { new: true },
    );
    const owner = await Owner.findOne({ email });
    return owner;
  } catch (e) {
    console.error('Error in createBarForOwner:', e);
    return { Error: 'Could not create bar.' };
  }
};

export const deleteBarForOwner = async (email, barId) => {
  try {
    const owner = await Owner.findOne({ email });
    const index = owner.bars.findIndex(el => el._id === barId); // eslint-disable-line
    owner.bars.splice(index, 1);
    owner.save();
    return owner;
  } catch (e) {
    console.error('Error in deleteBarForOwner:', e);
    return { Error: 'Could not delete bar.' };
  }
};

export const generateStaffCodeForBar = async (email, barId) => {
  try {
    const staffCode = shortid.generate();
    const hashedStaffCode = await bcrypt.hash(staffCode, 10);
    const owner = await Owner.findOne({ email });
    owner.bars.id(barId).staffCode = hashedStaffCode; // eslint-disable-line
    owner.save();
    return staffCode;
  } catch (e) {
    console.error('Error in generateStaffCodeForBar:', e);
    return { Error: 'Could not generate staff code.' };
  }
};

export const setBarIban = async (email, barId, iban) => {
  try {
    const owner = await Owner.findOne({ email });
    owner.bars.id(barId).iban = iban;
    owner.save();
    return iban;
  } catch (e) {
    console.error('Error in setBarIban:', e);
    return { Error: 'Could not set IBAN on server.' };
  }
};

export const createMenuForBar = async (email, barId, menu) => {
  try {
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
  } catch (e) {
    console.error('Error in createMenuForBar:', e);
    return { Error: 'Could not create menu for bar.' };
  }
};

export const deleteMenuForBar = async (email, barId, menuId) => {
  try {
    const owner = await Owner.findOne({ email });
      const index = owner.bars.id(barId).menus.findIndex(el => el._id.toString() === menuId); // eslint-disable-line
    owner.bars.id(barId).menus.splice(index, 1);
    if (owner.bars.id(barId).activeMenu !== null
        && owner.bars.id(barId).activeMenu._id.toString() === menuId) { // eslint-disable-line
      owner.bars.id(barId).activeMenu = null;
    }
    owner.save();
    return owner;
  } catch (e) {
    console.error('Error in deleteMenuForBar:', e);
    return { Error: 'Could not delete menu for bar.' };
  }
};

export const setActiveMenuForBar = async (email, barId, menuId) => {
  try {
    const owner = await Owner.findOne({ email });
    const menu = owner.bars.id(barId).menus.id(menuId);
    if (!owner.bars.id(barId).activeMenu) {
      owner.bars.id(barId).activeMenu = menu;
    } else {
      owner.bars.id(barId).activeMenu.set(menu);
    }
    owner.save();
    return owner;
  } catch (e) {
    console.error('Error in setActiveMenuMenuForBar:', e);
    return { Error: 'Could not set active menu for bar.' };
  }
};
