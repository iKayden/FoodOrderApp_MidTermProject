$(document).ready(function() {
  const $products = $(".product-container");

  const createProductElement = function (product) {
    const $product = $(`
    <article>
      <div class="price">Add 1 to cart ($${product.info.total_cost})</div>
      <div class="product">
        <img src=${product.info.photo_url} alt="photo_url">
        <div class="productInfo">
          <div class="productName">${product.info.name}</div>
          <div class="description">${product.info.description}</div>
        </div>
      </div>
    </article>`);
    return $product;
  };

  const renderProducts = function(products) {
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
      .then((products) => renderProducts(products))
      .catch((error) => {
        console.log("error", error);
      });
  };
  loadProducts();
});
