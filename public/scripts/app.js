$(document).ready(function() {
  const order = {
    customer_id: 1,
    total_cost: 1200,
    order_date: "2002-12-12",
    order_time_id: 1,
    product_id: 1
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

    $addToCart = $(".price");
    $addToCart.click(function() {
      $id = $(this).attr("key");
      order.product_id = {
        ...order.product_id,
        //if quantity is 0, quantity will be 1. If not, quantity will be increased by 1.
        [$id]: order.product_id[$id] ? order.product_id[$id] + 1 : 1,
      };
    });

    $cartButton = $("#cartButton");
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
