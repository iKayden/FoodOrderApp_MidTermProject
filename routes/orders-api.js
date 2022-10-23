const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
module.exports = router;

router.get('/:id', (req, res) => { // ask mentor about :id
  userQueries.getOrderDetails(req.params.id) //Changed the function a bit
    .then(orderDetails => {
      res.json({ orderDetails });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// POST request for orders
router.post('/', (req, res) => {
  const data = {...req.body};
  console.log("LOG FROM POST ROUTE", data);
  userQueries.addOrder({data})
    .then(data => {
      //twilio sends sms to owner (hardcode)
      res.send(data);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
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