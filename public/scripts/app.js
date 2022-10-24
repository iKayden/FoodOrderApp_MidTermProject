/* eslint-disable camelcase */
/* eslint-disable no-undef */
$(document).ready(function () {
  const order = {
    customer: { name: "John Smith", phone: "1236667777", total_cost: 69420 },
    cart_items: {order_id: 5, product_id: 3, quantity: 4 },
  };

  //productsResponse is used to store the data we get from database (products table)
  let productsResponse = {};

  const $products = $(".product-container");
  const $items = $(".modal-body");

  const createProductElement = function (product) {
    const $product = $(`
    <article>
      <div class="price" key=${product.id}>Add 1 to cart ($${product.price})</div>
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

    //adding products to cart
    const $addToCart = $(".price");
    $addToCart.click(function () {
      const $id = $(this).attr("key");
      order.beverages = {
        ...order.beverages,
        //if quantity is 0, quantity will be 1. If not, quantity will be increased by 1.

        [$id]: order.beverages[$id] ? order.beverages[$id] + 1 : 1,
      };
    });

    const $cartButton = $("#cartButton");
    $cartButton.click(function() {
      $.ajax({
        url: "/orders",
        method: "POST",
        data: JSON.stringify(order),
        dataType: "json",
        contentType: "application/json",
      });
    });

    $cartButton.click(function () {
      renderOrderItems(order.beverages);

      const totalCost = calculateTotalCost(order.beverages, productsResponse);
      const $totalCost = $(`
      <p class=total-cost>Total: $${totalCost}<p>
      `);

      //Save total cost to the order so that it can be sent to backend;
      order.total_cost = totalCost * 100;
      $items.append($totalCost);
    });
  };

  const loadProducts = function () {
    $.ajax({
      url: "/products",
      method: "GET",
    })
      .then((products) => {
        //Adding product's info to productsResponse, so it could be used to generate cart items.
        products.info.forEach((product) => {
          productsResponse[product.id] = product;
        });

        renderProducts(products.info);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  loadProducts();
});
