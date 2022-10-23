const db = require('../connection');

const getAllCustomers = () => { //Used by Admin
  const allCustomersQuery = 'SELECT * FROM customers;';
  return db.query(allCustomersQuery)
    .then(data => {
      return data.rows;
    });
};


const getAllInfo = () => {
  const cartQuery = `
  SELECT * FROM cart_items
  JOIN products ON products.id = cart_items.product_id
  JOIN orders ON orders.id = cart_items.order_id
  JOIN order_time ON order_time.id = orders.order_time_id;
  `;

  return db.query(cartQuery)
    .then(data => {
      return data.rows;
    });
};


const getOneCartItem = (itemId) => {
  const oneCartItemQuery =
  `SELECT * FROM cart_items
  JOIN products ON products.id = cart_items.product_id
  JOIN orders ON orders.id = cart_items.order_id
  WHERE cart_items.product_id = $1;
  `;

  return db.query(oneCartItemQuery, [itemId])
    .then(data => {
      return data.rows[0];
    });
};

const paymentDetails = (orderId) => {
  const paymentQuery = 'SELECT * FROM payments WHERE order_id = $1;';
  return db.query(paymentQuery, [orderId])
    .then(data => {
      return data.rows[0];
    });
};

const getOrderDetails = () => {
  const getOrdersQuery = 'SELECT * FROM orders;';
  return db.query(getOrdersQuery)
    .then(data => {
      return data.rows[0];
    });
};


module.exports = { getAllCustomers, getAllInfo, getOneCartItem, paymentDetails, getOrderDetails};
