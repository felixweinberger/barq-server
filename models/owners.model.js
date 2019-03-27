import bcrypt from 'bcrypt';
import shortid from 'shortid';

import Owner from '../schemas/owners.schema';

export const createOwner = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await Owner.create({ email, name, password: hashedPassword });
  return result;
};

export const deleteOwnerByEmail = async email => Owner.findOneAndDelete({ email });

export const findOwnerByEmail = async email => Owner.findOne({ email });

export const createBarForOwner = async (email, bar) => Owner.findOneAndUpdate(
  { email },
  { $push: { bars: bar } },
  { new: true },
);

export const deleteBarForOwner = async (email, bar) => Owner.findOneAndUpdate(
  { email },
  { $pull: { bars: bar } },
  { new: true },
);

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
  owner.bars.id(barId).menus.push(menu);
  if (owner.bars.id(barId).menus.length === 1) {
    owner.bars.id(barId).activeMenu = menu; // eslint-disable-line
  }
  owner.save();
  return owner;
};
