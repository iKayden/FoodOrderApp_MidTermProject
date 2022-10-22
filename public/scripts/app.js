// Client facing scripts here
const drinks = [
  {
    id: 1,
    name: "Passion fruit bubble tea",
    price: 8.99,
    photo_url: "/images/product1.png",
  },
  {
    id: 2,
    name: "Greenapple bubble tea",
    price: 8.99,
    photo_url: "/images/product2.png",
  },
  {
    id: 3,
    name: "Konjac bubble tea",
    price: 3.99,
    photo_url: "/images/product3.png",
  },
];

$(document).ready(function () {
  const $products = $(".product-container");

  const createProductElement = function (product) {
    let $product = $(`<article>
              <div class="price">$${product.price}</div>
              <div class="photo">${product.photo_url}</div>
              <div class="product">
                <div class="productName">${product.name}</div>
                <div class="description">${product.description}</div>
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
      url: "/api/products",
      method: "GET",
    })
      .then((products) => renderProducts(products))
      .catch((error) => {
        console.log("error", error);
      });
  };

  loadProducts();
});
