const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => { //gives all the info front end needs
  // res.cookie('user_id', 'customer') // cookie set-up 
  console.log("REQ QUERY", req.query);
  if (req.cookies.user_id === "admin") {
    userQueries.getOrders()
      .then(orders => {
        const templateVars = { orders , type: "orders"}
        res.json(templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  } else {
    userQueries.getAllProducts()
      .then(info => {
        console.log("Cookie data (name) ====>", req.cookies.user_id);
        res.json({ info, type: "product"});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }
});

router.get('/:id', (req, res) => {
  userQueries.getOneProduct(req.params.id)
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
