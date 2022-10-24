const authToken = process.env.AUTH_TOKEN;
const accountSid = process.env.ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);


const sendText = function(message) {
  return client.messages
    .create({
      body: message,
      from: '+12059557608',
      to: process.env.TWILIO_PHONE_NUMBER
    })
    .then(message => console.log(message))
    .catch(error => console.log(error));
};



module.exports = { sendText };
