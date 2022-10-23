const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => {
  userQueries.paymentDetails() //Changed the function a bit
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  userQueries.paymentDetails() //Changed the function a bit
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
