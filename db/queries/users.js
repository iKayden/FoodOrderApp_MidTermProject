const db = require('../connection');

const getAllCustomers = () => {
  //Used by Admin
  const allCustomersQuery = 'SELECT * FROM customers;';
  return db.query(allCustomersQuery).then((data) => {
    return data.rows;
  });
};

const getAllProducts = () => {
  const productsQuery = `SELECT * FROM products;`;
  return db.query(productsQuery).then((data) => {
    return data.rows;
  });
};

const getOneProduct = (productId) => {
  const oneProductQuery = `
  SELECT * FROM products WHERE id = $1;
  `;
  return db.query(oneProductQuery, [productId]).then((data) => {
    console.log('data.rows--->', data.rows[0]);
    return data.rows[0];
  });
};

const getAllInfo = () => {
  const cartQuery = `
  SELECT * FROM cart_items
  JOIN products ON products.id = cart_items.product_id
  JOIN orders ON orders.id = cart_items.order_id
  JOIN order_time ON order_time.id = orders.order_time_id;
  `;

  return db.query(cartQuery).then((data) => {
    return data.rows;
  });
};

const getOneCartItem = (itemId) => {
  const oneCartItemQuery = `SELECT * FROM cart_items
  JOIN products ON products.id = cart_items.product_id
  JOIN orders ON orders.id = cart_items.order_id
  WHERE cart_items.product_id = $1;
  `;

  return db.query(oneCartItemQuery, [itemId]).then((data) => {
    return data.rows[0];
  });
};

const paymentDetails = (orderId) => {
  const paymentQuery = 'SELECT * FROM payments WHERE order_id = $1;';
  return db.query(paymentQuery, [orderId]).then((data) => {
    return data.rows[0];
  });
};

const getOrderById = (id) => {
  const getOrderByIdQuery = `SELECT * FROM orders WHERE id=${id};`;
  return db.query(getOrderByIdQuery).then((data) => {
    return data.rows[0];
  });
};

const getOrders = () => {
  const getOrdersQuery =
    'SELECT orders.id, orders.status, cart_items.quantity, cart_items.product_id, products.name FROM orders JOIN cart_items ON order_id=orders.id JOIN products ON products.id=product_id GROUP BY orders.id,cart_items.quantity,cart_items.product_id, products.name;';
  return db.query(getOrdersQuery).then((data) => {
    return data.rows;
  });
};

const getOrderInfo = function (data) {
  const grouped = {};
  data.forEach((order) => {
    const { id, status, name, quantity, product_id } = order;
    const product = { name, quantity, id: product_id };
    if (grouped[id]) {
      grouped[id].products.push(product);
    } else {
      grouped[id] = {
        id,
        status,
        products: [product],
      };
    }
  });
  return Object.values(grouped);
};

const addOrder = function (order) {
  return db
    .query(
      `INSERT INTO orders (phone, total_cost)
      VALUES ($1 ,$2) RETURNING *`,
      [order.customer.phone, order.total_cost]
    )
    .then((data) => {
      const orderId = data.rows[0].id;
      const values = order.cart_items
        .map(
          (item) => `(
       ${orderId},${item.product_id},${item.quantity}
      )`
        )
        .join(', ');
      return db
        .query(
          `INSERT INTO cart_items (order_id, product_id, quantity)
        VALUES ${values} RETURNING *`
        )
        .then(() => {
          return data.rows[0];
        });
    });
};

const getProductsByIds = function (ids) {
  return db
    .query(`SELECT id, name, price FROM products WHERE id IN (${ids})`)
    .then((data) => {
      const productsInfo = {};
      data.rows.forEach((row) => (productsInfo[row.id] = row));
      return productsInfo;
    });
};

module.exports = {
  getAllCustomers,
  getAllInfo,
  getOneCartItem,
  paymentDetails,
  getOrderById,
  getOrders,
  getAllProducts,
  getOneProduct,
  addOrder,
  getProductsByIds,
  getOrderInfo,
};
