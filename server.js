// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
// const client = require('twilio')('AC5ee2df2d254cdfa1b626e876ed78858b', '4780c9a3d410231e52087d5ed003f142');

const PORT = process.env.PORT || 8080;
const app = express();

// var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
// var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
// SPA will be served from html
// All the routes will send data and JS will handle it and insert into html (add script to the file)

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// RESTful standart
// const widgetApiRoutes = require('./routes/widgets-api');

const customersApiRoutes = require('./routes/customers-api');
const paymentsApiRoutes = require('./routes/payments-api');
const ordersApiRoutes = require('./routes/orders-api');
const cartItemsApiRoutes = require('./routes/cart-items-api');
const productsApiRoutes = require('./routes/products-api');
// const orderTimeApiRoutes = require('./routes/order-time-api');

// cart_items route
// products route (menu data) SELECT * FROM products
// break it up by resource
// our server is an API (does calls and takes back data)

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/widgets', widgetApiRoutes);

app.use('/customers', customersApiRoutes);
app.use('/orders', ordersApiRoutes);
app.use('/cart_items', cartItemsApiRoutes);
app.use('/products', productsApiRoutes);
app.use('/payments', paymentsApiRoutes);

// app.use('/api/customers', customersApiRoutes);
// app.use('/api/orders', ordersApiRoutes);
// app.use('/api/cart_items', cartItemsApiRoutes);
// app.use('/api/products', productsApiRoutes);
// app.use('/api/payments', paymentsApiRoutes);

// app.use('/api/order_time', orderTimeApiRoutes);

// AJAX call routes (api endpoints that we are going to hit)
// maybe 2-3 app.use
// route /admin shows admin stuff (active orders, update orders, history of orders (add new items(stretch)))
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get('/', (req, res) => {
//   res.render('index');
// });

// index.html scripts styles - pub __dir

// function sendText() {
// client.messages
//   .create({
//      body: 'Hello team!',
//      from: '+12059557608',
//      to: '17783233992'
//    })
//   .then(message => console.log(message))
//   .catch(error => console.log(error))
//   };

//   sendText();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
