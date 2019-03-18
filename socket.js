/* eslint no-console: 0 */
const bars = {};
const orderSockets = {}; // orderNum: socket

const ioConfig = (io) => {
  io.on('connect', (user) => {
    // if user has correct token, identifiy as staff
    const { bar, orderNumber } = user.handshake.query;

    if (!user.handshake.token) {
      orderSockets[orderNumber] = user;
    }

    console.log('socket connected: ', bar);

    // if no namespace for this bar yet
    if (!bars[bar]) {
      bars[bar] = io.of(bar);

      bars[bar].on('connect', (socket) => {
        socket.on('STATUS_UPDATE', (order, newStatus) => {
          orderSockets[order].emit('STATUS_UPDATE', 'dude');

          // console.log('ordersockets: ', orderSockets[order] == socket);
          // console.log('order: ', order);
          console.log('newStatus: ', newStatus);
          console.log('got here');
        });

        socket.emit('message', `Emitting to room ${bar}`);
      });
    }

    // io.sockets.connected[orderSockets[order]].emit('STATUS_UPDATE', 'dude as well');
    // bars[bar].to(orderSockets[order]).emit('STATUS_UPDATE', newStatus);
    // io.emit('STATUS_UPDATE', 'dude once again');

    // everytime there is update to order, emit to socketId

    // tests
    // io.of('/123456').emit('message', 'Emitting to room A');
    // io.of('/abcdef').emit('message', 'Emitting to room B');
    // io.of('/').emit('message', 'Emitting everywhere');

    // user.on('disconnect', () => {
    //   console.log('socket disconnected');
    // });

    // user.on('request-room', async (ids, ack) => {
    //   try {
    //     const roomId = pair(ids);
    //     user.join(roomId);
    //     const messages = await Message.findAll({
    //       where: { roomId },
    //     });
    //     ack(roomId, messages);
    //   } catch (err) {
    //     console.log(Object.keys(err));
    //     user.emit('error');
    //   }
    // });

    // user.on('message', async (message, roomId, ack) => {
    //   try {
    //     const filteredMessage = filterProps(message, [
    //       'content', 'authorId', 'timestamp',
    //     ]);
    //     filteredMessage.roomId = roomId;
    //     await Message.create(filteredMessage);
    //     user.to(roomId).emit('new-message', message);
    //     ack(message.id);
    //   } catch (err) {
    //     console.log(err.errors[0].message);
    //     user.emit('error');
    //   }
    // });
  });

  return io;
};

export default ioConfig;
