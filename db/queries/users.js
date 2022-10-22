const db = require('../connection');

const getAllCustomers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllCustomers };
