const express = require('express');
const router = express.Router();
const twilio = require('../public/scripts/users');
const { MessagingResponse } = require('twilio').twiml;

router.post('/', (req, res) => {
  const smsInput = req.body.Body;
  const twiml = new MessagingResponse();
  twiml.message('Order 123 confirmed.');
  res.type('text/xml').send(twiml.toString());
});

module.exports = router;
