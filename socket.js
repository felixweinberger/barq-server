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
        // get orderNumber and/or token from socket connection
        if (orderNumber) orderBarSockets[bar][orderNumber] = socket;
        // if it's a client (orderNumber exists), save the socket
        if (token) socket.join('staff'); // if it's a bartender (has token), join the staff room

        socket.on('STATUS_UPDATE', (order, newStatus) => { // what to do when a STATUS_UPDATE event is received
          if (orderBarSockets[bar][order]) { // Check if order exists in bar
            orderBarSockets[bar][order].emit('STATUS_UPDATE', newStatus); // emit to client
            io.of(bar).to('staff').emit('STATUS_UPDATE', newStatus); // emit to staff room
          } else {
            console.log('Order does not exist'); // If order doesn't exist, log issue
          }
        });
      });
    }
  });

  return io;
};

export default ioConfig;
