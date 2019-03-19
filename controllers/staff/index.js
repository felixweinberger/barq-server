const staffCtrl = {};

const mockQueue = {
  barId: 'a791xu',
  name: 'Cheers',
  currency: 'GBP',
  open: 'false',
  history: [
    {
      orderId: 361,
      items: [
        {
          name: 'Budweiser',
          price: 2.99,
          quantity: 1,
        },
        {
          name: 'Coors',
          price: 3.5,
          quantity: 1,
        },
      ],
      status: 'delivered',
    },
  ],
  queue: [
    {
      orderId: 359,
      items: [
        {
          name: 'Budweiser',
          price: 2.99,
          quantity: 1,
        },
        {
          name: 'Coors',
          price: 3.5,
          quantity: 1,
        },
      ],
      status: 'paid',
    },
    {
      orderId: 360,
      items: [
        {
          name: 'Budweiser',
          price: 2.99,
          quantity: 1,
        },
        {
          name: 'Coors',
          price: 3.5,
          quantity: 1,
        },
      ],
      status: 'in preparation',
    },
    {
      orderId: 362,
      items: [
        {
          name: 'Budweiser',
          price: 2.99,
          quantity: 1,
        },
        {
          name: 'Coors',
          price: 3.5,
          quantity: 1,
        },
      ],
      status: 'ready for pickup',
    },
    {
      orderId: 363,
      items: [
        {
          name: 'Budweiser',
          price: 2.99,
          quantity: 1,
        },
        {
          name: 'Coors',
          price: 3.5,
          quantity: 1,
        },
      ],
      status: 'ready for pickup',
    },
  ],
};

staffCtrl.getQueue = async (req, res) => {
  const { barId } = req.params;

  // TODO
  // GET THE QUEUE FOR THE ACTUAL BAR HERE
  // AUTHORIZE THE STAFF MEMBER FOR THIS BAR

  // have to replace this with getting the actual queue
  const currentQueue = {
    ...mockQueue,
    barId,
  };

  // send back the current queue
  res.status(200);
  res.send(currentQueue);
};

staffCtrl.setBarStatus = async (req, res) => {
  const { barId } = req.params;
  const { open } = req.body;

  // TODO
  // SET THE STATUS FOR THE ACTUAL BAR HERE
  // AUTHORIZE THE STAFF MEMBER FOR THIS BAR

  // have to replace this with getting the actual queue
  const currentQueue = {
    ...mockQueue,
    barId,
    open,
  };

  // send back the current queue
  res.status(200);
  res.send(currentQueue);
};

export default staffCtrl;
