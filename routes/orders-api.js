const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const twilio = require("../public/scripts/users");

module.exports = router;

router.get("/:id", (req, res) => {
  // ask mentor about :id
  userQueries
    .getOrderDetails(req.params.id) //Changed the function a bit
    .then((orderDetails) => {
      res.json({ orderDetails });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST request for orders
router.post("/", (req, res) => {
  const body = req.body;
  const ids = body.cart_items.map((item) => item.product_id).join(",");
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
        res.json({ message: "Success!" });
      })
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  });
});

// twillio customer gets 3 msg "Recieved your order", "It will take x mins", "Order is ready"
// need extra post routes for messages
// one more page with
