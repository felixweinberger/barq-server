/* eslint-disable no-console */
const Owner = require('../owner/owners.model.js');

const customerModel = {};

customerModel.getMenu = async (barId) => {
  try {
    const owner = await Owner.findOne({ bars: { $elemMatch: { _id: barId } } });

    // TODO: fix this to not just take the first menu, but the active one
    const { name, currency } = owner.bars.id(barId);
    const items = owner.bars.id(barId).menus[0].categories.map(category => category);

    const menu = {
      barId,
      name,
      currency,
      open: true, // TODO: check the queue for this status
      menu: items,
    };

    return menu;
  } catch (error) {
    console.log('Error in getMenu: bar not found.');
    return { Error: 'Bar not found.' };
  }
};

export default customerModel;
