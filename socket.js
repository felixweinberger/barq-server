/* eslint-disable no-console */
import { addToQueue, updateOrderStatus, getOrder } from './db/queue';

// key: bar, value: { key: orderNum, value: socket }
const orderBarSockets = {};

const ioConfig = (io) => {
  // when anyone connects
  io.on('connect', (user) => {
    const { bar } = user.handshake.query;

    // if no namespace for this bar yet
    if (!orderBarSockets[bar]) {
      orderBarSockets[bar] = {};
      const barId = bar.slice(1);

      // if someone connects to this bar
      io.of(bar).on('connect', (socket) => {
        const { orderNumber, token } = socket.handshake.query;

        // get orderNumber and send current status if already exists
        if (orderNumber) {
          orderBarSockets[bar][orderNumber] = socket;
          const currentOrder = getOrder(barId);
          if (currentOrder) socket.emit('STATUS_UPDATE', currentOrder.status);
        }

        // if it's a staff member (token exists), join staff room
        if (token) socket.join('staff');

        // when staff updates status of an order
        socket.on('STATUS_UPDATE', (orderId, newStatus) => {
          // if order exists, update the queue cache and emit to customer and staff
          if (orderBarSockets[bar][orderId]) {
            updateOrderStatus(barId, orderId, newStatus);
            orderBarSockets[bar][orderId].emit('STATUS_UPDATE', newStatus);
            io.of(bar).to('staff').emit('STATUS_UPDATE', orderId, newStatus);
          } else {
            console.error('Order does not exist');
          }
        });

        // when a new order is made, update the queue and staff members
        socket.on('NEW_ORDER', (newOrder) => {
          addToQueue(barId, newOrder);
          io.of(bar).to('staff').emit('NEW_ORDER', newOrder);
        });
      });
    }
  });

  return io;
};

export default ioConfig;
