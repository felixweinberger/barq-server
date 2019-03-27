/* eslint-disable no-console */
import bcrypt from 'bcrypt';

import Owner from '../schemas/owners.schema';

export const getActiveMenu = async (barId) => {
  try {
    const owner = await Owner.findOne({ bars: { $elemMatch: { _id: barId } } });
    const { name, currency } = owner.bars.id(barId);
    const items = owner.bars.id(barId).activeMenu.categories.map(category => category);

    const menu = {
      barId,
      name,
      currency,
      open: true,
      menu: items,
    };

    return menu;
  } catch (error) {
    console.log('Error in getMenu: bar not found.');
    return { Error: 'Bar not found.' };
  }
};

export const addOrderToHistory = async (barId, confirmation) => {
  try {
    const owner = await Owner.findOne({ bars: { $elemMatch: { _id: barId } } });
    owner.bars.id(barId).history.push(confirmation);
    owner.save();
    return 0;
  } catch (e) {
    console.log('Error in addOrderToHistory.');
    return { Error: 'Error adding order to history.' };
  }
};

export const checkStaffCodeByBar = async (barId, staffCode) => {
  const owner = await Owner.findOne({ bars: { $elemMatch: { _id: barId } } });
  const bar = owner.bars.filter(el => barId === el._id)[0]; // eslint-disable-line
  const isCorrectCode = await bcrypt.compare(staffCode, bar.staffCode);
  return isCorrectCode;
};
