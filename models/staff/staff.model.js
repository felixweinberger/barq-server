import mongoose from '../../db/db';

const OrderItem = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Order = new mongoose.Schema({
  orderId: Number,
  status: String,
  items: [OrderItem],
});

const queueSchema = new mongoose.Schema({
  _id: String,
  name: String,
  currency: String,
  open: Boolean,
  history: [Order],
  queue: [Order],
});

const Queue = mongoose.model('Queue', queueSchema);

export default Queue;
