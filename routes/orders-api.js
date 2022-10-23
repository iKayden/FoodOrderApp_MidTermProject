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
  console.log("user-->", req.body.user);
  console.log("phone --->", req.body.user.phone);
  console.log("name --->", req.body.user.name);
  console.log("beverages", req.body.beverages[6]);
  console.log("beverages KEYS", Object.keys(req.body.beverages));
  console.log("beverages VALUES", Object.values(req.body.beverages));
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