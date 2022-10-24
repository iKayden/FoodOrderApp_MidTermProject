const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const twilio = require('../public/scripts/users');

const authToken = process.env.AUTH_TOKEN;
const accountSid = process.env.ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);


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
  userQueries.addOrder({data})
    .then(data => {
      console.log('data.customer.name', req.body.customer.name);
      // console.log("KEYS", Object.keys(data.customer));
      // console.log("VALUES", Object.values(data.customer));
      twilio.sendText(`Hey, we have a new order!  ${req.body.customer.phone} ${req.body.customer.name} ${req.body.customer.total_cost}`);
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
