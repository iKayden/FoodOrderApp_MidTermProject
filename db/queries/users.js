const db = require('../connection');

const getAllCustomers = () => { //Used by Admin
  return db.query('SELECT * FROM customers;')
    .then(data => {
      return data.rows;
    });
};

const cartQuery = 'SELECT * FROM cart_items JOIN products ON products.id = cart_items.product_id JOIN orders ON orders.id = cart_items.order_id JOIN order_time ON order_time.id = orders.order_time_id;';

const getAllCartItems = () => {
  return db.query(cartQuery)
    .then(data => {
      return data.rows;
    });
};

const oneCartItemQuery = 'SELECT * FROM cart_items JOIN products ON products.id = cart_items.product_id JOIN orders ON orders.id = cart_items.order_id WHERE cart_items.product_id = $1;';

const getOneCartItem = (itemId) => {
  return db.query(oneCartItemQuery, [itemId])
    .then(data => {
      return data.rows[0];
    });
};

const paymentQuery = 'SELECT * FROM payments WHERE order_id = $1;';
const paymentDetails = (orderId) => {
  return db.query(paymentQuery, [orderId])
    .then(data => {
      return data.rows[0];
    });
};

const getOrdersQuery = 'SELECT * FROM orders;';
const getOrderDetails = () => {
  return db.query(getOrdersQuery)
    .then(data => {
      return data.rows[0];
    });
};


module.exports = { getAllCustomers, getAllCartItems, getOneCartItem, paymentDetails, getOrderDetails};
