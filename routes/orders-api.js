const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/:id', (req, res) => { // ask mentor about :id
  userQueries.getOrderDetails() //Changed the function a bit
    .then(orderDetails => {
      res.json({ orderDetails });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

// POST request for orders
router.post('/', (req, res) => {
  console.log("BODY", req.body);
  console.log("customer id -->", req.body.customer_id);
  console.log("total cost --->", req.body.total_cost);
  console.log("date --->", req.body.order_date);
  console.log("product id --->", req.body.product_id);
  console.log("order time id --->", req.body.order_time_id);
});

// router.post('/properties', (req, res) => {
//   const userId = req.session.userId;
//   database.addProperty({...req.body, owner_id: userId})
//     .then(property => {
//       res.send(property);
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e)
//     });
// });

// return router;