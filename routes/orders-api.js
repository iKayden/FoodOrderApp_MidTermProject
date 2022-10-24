const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const twilio = require('../public/scripts/users');

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
  const body = req.body;
  console.log("BODY", body);
  userQueries.addOrder(body)
    .then(data => {
      // msg to the owner
      console.log("DATA from insert file", data);
      twilio.sendText(`Hey, we have your order! Order ID is => ${data.id}, Your total cost is ${data.total_cost}`);
      return data;
    })
    .then((data) => {
      twilio.sendText(`Hey, we have a new order! Order ID is => ${data.id}, The total cost is ${data.total_cost}`);
      return data;
    })
    .then(() => {
      res.json({data});
    })
    .catch(e => {
      console.log(e);
      res.json(e);
    });
});

// twillio customer gets 3 msg "Recieved your order", "It will take x mins", "Order is ready"
// need extra post routes for messages
// one more page with 