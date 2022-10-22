// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

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
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
// cart_items route
// products route (menu data) SELECT * FROM products
// break it up by resource
// our server is an API (does calls and takes back data)

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
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

// index.html sctipts styles - pub __dir


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
