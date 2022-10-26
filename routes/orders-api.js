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
router.post('/', async (req, res) => {

  const body = req.body;
  Promise.all(body.cart_items.map(row => {

    return userQueries.getPriceById(row.product_id)
      .then((table) => {
        row.price = table;
        return row;
      });
  })).then(response => {
    let totalPrice = 0;
    for (let item of response) {
      totalPrice += (item.quantity * item.price);
      // totalPrice = totalPrice + tempPrice;
    }
    let tax = totalPrice * (0.05);
    let totalAmount = totalPrice + tax;
    console.log("Total Amount ", totalAmount);

    //// TWILLIO AND DATABASE STUFF
    // return res.json({});
    userQueries.addOrder(body)
      .then((data) => {
        // msg to the customer
        twilio.sendText(`Hey, we have your order! Order ID is => ${data.id}, Your total cost is ${data.total_cost}`);
        return { data };
      }).then((data) => {
        // msg to owner
        twilio.sendText(`Hey, we have a new order! Order ID is => ${data.id}, The total cost is ${data.total_cost}`);
        return { data };
      }).then((data) => {
        // res.json( {data} );
        res.json({ message: 'Success!' });
      }).catch(e => {
        console.log(e);
        res.json(e);
      });
    // twillio customer gets 3 msg "Recieved your order", "It will take x mins", "Order is ready"
    // need extra post routes for messages
    // one more page with
  });
}); //Router.post ENDS here.

router.get('/', (req, res) => {
  userQueries.getOrders()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
