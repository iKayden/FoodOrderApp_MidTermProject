const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  //gives all the info front end needs
  if (!req.cookies.user_id) {
    res.cookie('user_id', 'customer'); // cookie set-up 
  }
  userQueries
    .getAllProducts()
    .then((info) => {
      console.log('Cookie data (name) ====>', req.cookies.user_id);
      res.json({ info, type: 'product' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  userQueries
    .getOneProduct(req.params.id)
    .then((info) => {
      res.json({ info });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
// router.post('/', (req, res) => {

// })

module.exports = router;
