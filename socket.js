/* eslint-disable no-console */
import { addToQueue, updateOrderStatus } from './db/queue';

const orderBarSockets = {}; // orderNum: socket

const ioConfig = (io) => {
  io.on('connect', (user) => {
    // if user has correct token, identify as staff
    const { bar } = user.handshake.query;

    // if no namespace for this bar yet
    if (!orderBarSockets[bar]) {
      orderBarSockets[bar] = {};
      const barId = bar.slice(1);

      io.of(bar).on('connect', (socket) => {
        const { orderNumber, token } = socket.handshake.query;

        // get orderNumber and/or token from socket connection
        if (orderNumber) orderBarSockets[bar][orderNumber] = socket;

        // if it's a staff member (token exists), save the socket
        if (token) socket.join('staff'); // if it's a bartender (has token), join the staff room

        // what to do when staff updates status of an order
        socket.on('STATUS_UPDATE', (orderId, newStatus) => {
          // what to do when a STATUS_UPDATE event is received
          if (orderBarSockets[bar][orderId]) { // Check if order exists in bar
            // update the cached queue on the server
            updateOrderStatus(barId, orderId, newStatus);
            orderBarSockets[bar][orderId].emit('STATUS_UPDATE', newStatus); // emit to client
            io.of(bar).to('staff').emit('STATUS_UPDATE', orderId, newStatus); // emit to staff room
          } else {
            console.error('Order does not exist'); // If order doesn't exist, log issue
          }
        });

        // needs to be replaced with emitting on API call, not on connect
        socket.on('NEW_ORDER', (newOrder) => {
          // update the cached queue on the server
          addToQueue(barId, newOrder);

          // emit new order to all bar staff
          io.of(bar).to('staff').emit('NEW_ORDER', newOrder);
        });
      });
    }
  });

  return io;
};

export default ioConfig;
