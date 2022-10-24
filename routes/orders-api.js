const express = require('express');
const router  = express.Router();
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
  const data = {...req.body};
  userQueries.addOrder({data})
    .then(data => {
      // msg to the owner
      // twilio.sendText(`Hey, we have a new order! Order ID is => ${req.body.cart_items.order_id}, the Product ID is ${req.body.cart_items.product_id} we need ${req.body.cart_items.quantity} of it.`);
      
      // // customer update
      // console.log("Sending msg to the customer");
      // const msgToCustomer = setTimeout(twilio.sendText(`This a text for the ${req.body.customer.name}. Your phone number is ${req.body.customer.phone}. The total cost of your order will be ${req.body.customer.total_cost}`), 10000);
      // msgToCustomer();
      res.send(data);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});


