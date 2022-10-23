$(document).ready(function () {
  let order = { user: {} };
  const $products = $(".product-container");

  const createProductElement = function (product) {
    const $product = $(`
    <article>
      <div class="price">Add 1 to cart ($${product.price})</div>
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
      $products.prepend($product);
    });
  };

  const loadProducts = function () {
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

  // $addToCart = $(".price");
  // let quantity = 0;
  // $addToCart.click(function () {
  //   $id = $(this).attr("key");
  //   quantity++;
  //   order.beverages = { $id: { quantity: quantity } };
  //   console.log(order.beverages);
  // });
});
