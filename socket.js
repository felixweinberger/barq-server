/* eslint no-console: 0 */
const orderBarSockets = {}; // orderNum: socket

const ioConfig = (io) => {
  io.on('connect', (user) => {
    // if user has correct token, identifiy as staff
    const { bar } = user.handshake.query;
    // if no namespace for this bar yet
    if (!orderBarSockets[bar]) {
      orderBarSockets[bar] = {};

      io.of(bar).on('connect', (socket) => {
        const { orderNumber, token } = socket.handshake.query;
        if (orderNumber) orderBarSockets[bar][orderNumber] = socket;
        if (token) socket.join('staff');

        socket.on('STATUS_UPDATE', (order, newStatus) => {
          if (orderBarSockets[bar][order]) {
            orderBarSockets[bar][order].emit('STATUS_UPDATE', newStatus);
            io.of(bar).to('staff').emit('STATUS_UPDATE', newStatus);
          } else {
            console.log('Order does not exist');
          }
        });
      });
    }
  });

  return io;
};

export default ioConfig;
