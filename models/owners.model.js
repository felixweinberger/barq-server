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
