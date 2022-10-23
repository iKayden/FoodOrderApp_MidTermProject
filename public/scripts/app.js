// Client facing scripts here
const drinks = [
  {
    id: 1,
    name: "Passion fruit bubble tea",
    price: 8.99,
    photo_url: "/images/product1.png",
    description:
      "Brown sugar tapioca with mashed taro and fresh milk, topped with ube taro sauce.",
  },
  {
    id: 2,
    name: "Greenapple bubble tea",
    price: 8.99,
    photo_url: "/images/product2.png",
    description:
      "Brown sugar tapioca with mashed taro and fresh milk, topped with ube taro sauce.",
  },
  {
    id: 3,
    name: "Konjac bubble tea",
    price: 3.99,
    photo_url: "/images/product3.png",
    description:
      "Brown sugar tapioca with mashed taro and fresh milk, topped with ube taro sauce.",
  },
];

$(document).ready(function () {
  const $products = $(".product-container");

  const createProductElement = function (product) {
    let $product = $(`
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

  renderProducts(drinks);

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
