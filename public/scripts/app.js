$(document).ready(function() {
  const order = {
    customer: { name: "John Smith", phone: "1236667777" },
    beverages: {},
  };

  const $products = $(".product-container");

  const createProductElement = function(product) {
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

  const renderProducts = function(products) {
    products.forEach((product) => {
      const $product = createProductElement(product);
      $products.append($product);
    });

    const $addToCart = $(".price");
    $addToCart.click(function() {
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
  };

  const loadProducts = function() {
    $.ajax({
      url: "/products",
      method: "GET",
    })
      .then((products) => {
        renderProducts(products.info);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  loadProducts();
});
