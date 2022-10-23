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
  console.log("user-->", req.body.customer);
  console.log("phone --->", req.body.customer.phone);
  console.log("name --->", req.body.customer.name);
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