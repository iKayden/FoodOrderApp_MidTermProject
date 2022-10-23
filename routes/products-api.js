const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => { //gives all the info front end needs
  userQueries.getAllProducts()
    .then(info => {
      res.json({ info });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => { //gives all the info front end needs
  userQueries.getOneProduct(req.body.id)
    .then(info => {
      res.json({ info });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
// router.post('/', (req, res) => {
  
// })


module.exports = router;
