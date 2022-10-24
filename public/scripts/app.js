$(document).ready(function () {
  const order = {
    customer: { name: "John Smith", phone: "1236667777" },
    beverages: {},
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
      $id = $(this).attr("key");
      order.beverages = {
        ...order.beverages,
        //if quantity is 0, quanity will be 1. If not, quantity will be increased by 1.
        [$id]: order.beverages[$id] ? order.beverages[$id] + 1 : 1,
      };
    });

    const createOrderItem = function (itemId, quantity) {
      const $item = $(`
      <article>
        <div class="itemPrice" key=${itemId}>$${
        (productsResponse[itemId].price * quantity) / 100
      }</div>
        <div class="itemInfo">
            <div class="productName">${productsResponse[itemId].name}</div>
            <div class="quantity">${quantity}</div>
        </div>
      </article>`);
      return $item;
    };

    const renderOrderItems = function (items) {
      for (item in items) {
        //item is the id of item, items[item] is the quantity of item.
        const $item = createOrderItem(item, items[item]);
        $items.append($item);
      }
    };

    const $cartButton = $("#cartButton");
    $cartButton.click(function () {
      renderOrderItems(order.beverages);

      $.ajax({
        url: "/orders",
        method: "POST",
        data: JSON.stringify(order),
        dataType: "json",
        contentType: "application/json",
      });
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
