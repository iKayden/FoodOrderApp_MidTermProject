const express = require('express');
const router = express.Router();
const { format, utcToZonedTime } = require('date-fns-tz');

const userQueries = require('../db/queries/users');
const twilio = require('../public/scripts/users');

module.exports = router;

router.get('/:id', (req, res) => {
  userQueries
    .getOrderById(req.params.id)
    .then((orderDetails) => {
      res.json(orderDetails);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {
  userQueries
    .changeStatus(req.params.id, req.body)
    .then((data) => {
      const time = format(
        utcToZonedTime(data.ready_at, 'America/Los_Angeles'),
        'p'
      );
      const status = data.status;
      if (status === 'CONFIRMED') {
        twilio.sendText(
          `Hey, your order has been confirmed! Order ID is => ${data.id} and it will be ready at ${time}.`
        );
      } else {
        twilio.sendText(`Hey, your order is ready! Order ID is =>${data.id}.`);
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST request for orders
router.post('/', (req, res) => {
  const body = req.body;
  const user_id = req.cookies.user_id;
  // console.log("LOOKING FOR COOKIE", user_id);
  const ids = body.cart_items.map((item) => item.product_id).join(',');
  userQueries.getProductsByIds(ids).then((data) => {
    let totalCost = 0;
    body.cart_items.forEach((item) => {
      const cost = item.quantity * data[item.product_id].price;
      totalCost += cost;
    });
    totalCost *= 1.05;
    totalCost = Math.round(totalCost * 100) / 100;

    userQueries
      .addOrder(body)
      .then((data) => {
        // msg to the customer
        twilio.sendText(
          `Hey, we have your order! Order ID is => ${
            data.id
          }, Your total cost is $${data.total_cost / 100}.`
        );
        // msg to the owner
        twilio.sendText(
          `Hey, we have a new order! Order ID is => ${
            data.id
          }, The total cost is $${data.total_cost / 100}.`
        );
        res.json({ message: 'Success!', order: data });
      })
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  });
});

router.get('/', (req, res) => {
  userQueries
    .getOrders()
    .then((input) => res.json(userQueries.getOrderInfo(input)))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// app.get("/",(req,res,next)=>{
//   let timeStamp = new Date().getTime();
//   let randomNum = Math.floor(Math.random(0,10)*1000);
//   return res.json({timeStamp,randomNum});
// });
