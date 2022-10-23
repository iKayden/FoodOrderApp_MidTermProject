const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => { //gives all the info front end needs
  userQueries.getAllInfo() //HAS 4 tables in it shows * in Cart items, products, orders, order time
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
