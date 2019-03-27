/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { addToQueue, updateOrderStatus, getOrderStatus } from './models/queues.model';

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

      io.of(bar).on('connect', async (socket) => {
        const { orderNumber, token } = socket.handshake.query;
        // get orderNumber and/or token from socket connection
        if (orderNumber) {
          orderBarSockets[bar][orderNumber] = socket;
          const orderStatus = await getOrderStatus(barId, orderNumber);
          if (orderStatus) socket.emit('STATUS_UPDATE', orderStatus);
        }

        // if it's a staff member (token exists), join staff room
        if (token) {
          try {
            const { barId: decBarId } = jwt.verify(token, process.env.JWT_SK);
            if (decBarId === barId) socket.join('staff');
          } catch (err) {
            console.log(err);
            socket.disconnect(true);
          }
        }

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

        // needs to be replaced with emitting on API call, not on connect
        socket.on('NEW_ORDER', async (newOrder) => {
          // update the cached queue on the server
          const isNewOrder = await addToQueue(barId, newOrder);
          // need to check if orderNumber already exists, if yes do not create new order
          const orderStatus = await getOrderStatus(barId, orderNumber);
          // emit new order to all bar staff
          if (orderStatus) socket.emit('STATUS_UPDATE', orderStatus);
          if (isNewOrder) io.of(bar).to('staff').emit('NEW_ORDER', newOrder);
        });
      });
    }
  });

  return io;
};

export default ioConfig;
