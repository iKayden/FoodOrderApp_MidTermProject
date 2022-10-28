const order = {
  customer: {
    name: 'John Smith',
    phone: '1236667777',
  },
  total_cost: 0,
  cart_items: [],
  beverages: {},
};

//  ******************* START ********************
$(document).ready(function () {
  if (document.cookie.includes('user_id=admin')) {
    loadOrders();
  } else if (document.cookie.includes('order_id')) {
    loadOneOrder();
  } else {
    loadProducts();
  }

  $(document).on('click', '.price', onPriceClick);
  $(document).on('click', '.placeOrder', onOrderClick);
  $(document).on('click', '#cartButton', onCartClick);
  $(document).on('click', '.plus', onPlusClick);
  $(document).on('click', '.minus', onMinusClick);
  $(document).on('click', '.accept-order-btn', onAcceptOrder);
  $(document).on('click', '#close-order-btn', loadOneOrder);
  $(document).on('click', '.order-ready', orderIsReady);
});
//************End of DOCUMENT READY  **************

let productsResponse = {};

const $products = $('.product-container');
const $items = $('.modal-body');
const $orders = $('.orders-container');

const loadProducts = function () {
  $.get('/api/products')
    .then((data) => {
      if (data.type === 'orders') {
        renderOrders(data.orders);
      } else {
        data.info.forEach((datum) => {
          productsResponse[datum.id] = datum;
        });
        renderProducts(data.info);
      }
    })
    .catch((error) => {
      console.log('error', error.message);
    });
};

const onPlusClick = function () {
  //find product id
  const $id = $(this).closest('article').attr('key');
  const $totalItemPrice = $(this).closest('article').children(':first');
  //change quantity
  order.beverages[$id]++;
  $.get(`/api/products/${$id}`, function (data) {
    // data = JSON.parse(data);
    const price = data.info.price;
    $totalItemPrice.text(`$${(price * order.beverages[$id]) / 100}`);
    const totalCost = calculateTotalCost(order.beverages, productsResponse);
    $('.total-cost').text(`Total Cost: $${totalCost}`);
  });

  //update quantity in HTML
  $(this).next().text(order.beverages[$id]);
};

const onMinusClick = function () {
  const $id = $(this).closest('article').attr('key');
  const $totalItemPrice = $(this).closest('article').children(':first');
  //check if quantity is 0.
  order.beverages[$id] === 0 ? 0 : order.beverages[$id]--;
  $.get(`/api/products/${$id}`, function (data) {
    // data = JSON.parse(data);
    const price = data.info.price;
    $totalItemPrice.text(`$${(price * order.beverages[$id]) / 100}`);
    const totalCost = calculateTotalCost(order.beverages, productsResponse);
    $('.total-cost').text(`Total Cost: $${totalCost}`);
  });
  $(this).prev().text(order.beverages[$id]);
};

const onPriceClick = function () {
  const $id = $(this).attr('key');
  order.beverages = {
    ...order.beverages,
    //if quantity is 0, quantity will be 1. If not, quantity will be increased by 1.
    [$id]: order.beverages[$id] ? order.beverages[$id] + 1 : 1,
  };
};

const calculateTotalCost = function (order, productInfo) {
  let result = 0;
  for (item in order) {
    const cost = productInfo[item].price * order[item];
    result += cost;
  }
  //tax rate is 5%
  const tax = result * 0.05;
  result += tax;
  result = Math.round(result) / 100;
  return result;
};

const onOrderClick = function () {
  $items.css('display', 'none');
  $('.lds-dual-ring').css('display', 'inline-block');
  setTimeout(function () {
    const cart_items = Object.keys(order.beverages).map((key) => ({
      product_id: key,
      quantity: order.beverages[key],
    }));
    order.cart_items = cart_items;
    $.post('api/orders', order).then((result) => {
      $items.css('display', 'block');
      $('.lds-dual-ring').css('display', 'none');
      document.cookie = `order_id=${result.order.id}`;
      const $successMessage = $(`<p>${result.message}</p>`);
      $items.empty();
      $('.placeOrder').hide();
      $items.append($successMessage);
      order.beverages = {};
    });
  }, 1000);
};

const createOrderItem = function (itemId, quantity) {
  const $item = $(`
    <article key=${itemId}>
    <div class="item-price" key=${itemId}>$${
    (productsResponse[itemId].price * quantity) / 100
  }</div>
    <div class="item-info">
    <div class="product-name">${productsResponse[itemId].name}</div>
    <div class="quantity">Quantity: <button class="plus">+</button><span class="quantity-value">${quantity}</span><button class="minus">-</button></div>
    </div>
    </article>`);
  return $item;
};

const createProductElement = function (product) {
  const $product = $(`
    <article>
    <div class="price" key=${
      product.id
    }><button class="btn btn-warning">Add to Cart</button>
    <span class="price-tag" >
    <i class="fa-solid fa-dollar-sign"></i>${product.price / 100}
    </span>
  </div>
    <div class="product">
    <img src=${product.photo_url} alt="photo_url">
        <div class="productInfo">
          <div class="productName">${product.name}</div>
          <div class="description">${product.description}</div>
          </div>
          </div>
          </article>`);
  return $product;
};

const renderProducts = function (products) {
  products.forEach((product) => {
    const $product = createProductElement(product);
    $products.append($product);
  });
};

const renderOrderItems = function (items) {
  $items.empty();
  for (item in items) {
    //item is the id of item, items[item] is the quantity of item.
    const $item = createOrderItem(item, items[item]);
    $items.append($item);
  }
};

const onCartClick = function () {
  renderOrderItems(order.beverages);
  $('.placeOrder').show();
  const totalCost = calculateTotalCost(order.beverages, productsResponse);
  const $totalCost = $(`
    <p class=total-cost>Total Cost: $${totalCost}<p>
    `);

  //Save total cost to the order so that it can be sent to backend;
  order.total_cost = totalCost * 100;
  $items.append($totalCost);
};

const loadOrders = function () {
  $.get('/api/orders')
    .then((orders) => {
      renderOrders(orders);
    })
    .catch((error) => {
      console.log('error', error.message);
    });
};

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const loadOneOrder = function () {
  const cookieId = getCookie('order_id');

  $.get(`/api/orders/${cookieId}`)
    .then((order) => {
      $('#login').hide();
      $('#register').hide();
      renderOneOrder(order);
    })
    .catch((err) => {
      console.log('error: loadOneOrder', err.message);
    });
};

const renderOrders = function (orders) {
  orders.forEach((order) => {
    const $order = createOrderElement(order);
    $order.find('.accept-order-btn').click(function () {
      $(this).val('Order Ready').siblings().hide();
    });
    $orders.append($order);
  });
};

const renderOneOrder = function (order) {
  $products.empty();
  if (!order.time) {
    order.time = 'TO BE CONFIRMED';
  }

  const $order = $(`
  <article>
    <div class="newOrder" key=${order.id}> Order ID: ${order.id}</div>
      <div class="order">
        <div class=order-time> Your order will be ready at: <b> ${order.time}</b>.</div>
        <div class="order-info"> Status of your order: <b>${order.status}</b></div>
        <div>Thank you for your purchase!</div>
      </div>
  </article>`);
  $products.append($order);
};

const createOrderElement = function (order) {
  const drinksArray = [];
  for (let drink of order.products) {
    drinksArray.push(
      `<div class="order-name">${drink.quantity}x of ${drink.name}</div>`
    );
  }

  const $order = $(`
  <article class="new-order-article">
  <div class="newOrder">You received a new order!</div>
  <div class="order">
        <div class="orderInfo"></div>
        <img class="admin-order-img" src="../images/logo.png" alt="photo_url">
        <div class="orderID">Order ID: <b>${order.id}</b></div>
        ${drinksArray.join(' ')}
          <form action="/api/orders/${
            order.id
          }" method="POST" class="admin-order-form">
          <div><label for="order-question">How long will this take? </label><br>
          <input type="text" class="order-time-textbox" placeholder="Please enter a time">
          <input key=${
            order.id
          } type="submit" class="accept-order-btn" value="Accept Order">
          </form>
          </div>
    </article>`);
  return $order;
};

const onAcceptOrder = function (e) {
  e.preventDefault(); // preventing browser from reloading
  const cookieId = $(this).attr('key');
  const order = { time: $(this).prev().val() };
  $.post(`/api/orders/${cookieId}`, order).then((data) => {});

  $(this).removeClass('accept-order-btn').addClass('order-ready');
  $('.order-ready').on('click', function (e) {
    e.preventDefault();
    const output = { status: 'FINISHED' };

    $.post(`/api/orders/${cookieId}`, output).then((data) => {});
  });
};

const orderIsReady = function () {
  const $parent = $(this).parent().parent().parent().parent().hide();
};
