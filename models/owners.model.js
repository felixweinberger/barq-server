import bcrypt from 'bcrypt';

import Owner from '../schemas/owners.schema';

export const createOwner = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await Owner.create({ email, name, password: hashedPassword });
  return result;
};

export const deleteOwnerByEmail = async email => Owner.findOneAndDelete({ email });

export const findOwnerByEmail = async email => Owner.findOne({ email });

export default createOwner;
