/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getAllCustomers() //Changed the function a bit
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/cart_items', (req, res) => {
  userQueries.getAllCartItems() //Changed the function a bit
    .then(item => {
      res.json({ item });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/cart_times/:id', (req, res) => {
  userQueries.getOneCartItem() //Changed the function a bit
    .then(item => {
      res.json({ item });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/payment_details', (req, res) => {
  userQueries.paymentDetails() //Changed the function a bit
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/order_details', (req, res) => {
  userQueries.getOrderDetails() //Changed the function a bit
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
