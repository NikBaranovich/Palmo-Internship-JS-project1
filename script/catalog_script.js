async function fetchGoods() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
}
async function fetchCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await response.json();
  return categories;
}
async function fetchCategoryProducts(category) {
  if (category === "all") {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
  }
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const products = await response.json();
  return products;
}
const catalog = document.querySelector(".catalog-list");
const categoriesElement = document.querySelector(".product-groups");
const filterButton = document.querySelector(".filter-button");

const setProducts = (products) => {
  catalog.innerHTML = products.reduce(
    (layout, product) =>
      (layout += `
      <li class="catalog-item">
            <a href="">
              <h3>
                <span class="catalog-category">${product.category}</span>
                <span class="catalog-item-title">"${product.title}"</span>
              </h3>

              <img
                class="catalog-item-image"
                src="${product.image}"
                alt="${product.title}"
              />
            </a>
            <p class="catalog-item-price">
              <b>${product.price} \$</b>
              <button class="button cart-add-button" type="button" data-product-id = "${product.id}">Add to cart</button>
            </p>
          </li>`),
    ``
  );
};

const setCategories = (categories) => {
  categoriesElement.innerHTML = categories.reduce(
    (layout, category) =>
      (layout += `
      <li class="filter-option filter-radio">
      <input
        class="visually-hidden filter-input-radio filter-input"
        type="radio"
        name="product-group"
        value="${category}"
        id="filter-${category}"
      />
      <label for="filter-${category}">${category}</label>
    </li>`),
    `<li class="filter-option filter-radio">
    <input
      class="visually-hidden filter-input-radio filter-input"
      type="radio"
      name="product-group"
      value="all"
      id="filter-all"
      checked
    />
    <label for="filter-all">all</label>
  </li>`
  );
};

const showToast = () => {
  var toastElement = document.querySelector("#cart-added-toast");
  toastElement.className = "show";
  setTimeout(() => {
    toastElement.className = toastElement.className.replace("show", "");
  }, 3000);
};

const addToCart = (products, productId) => {
  let cart = cartItems;
  const product = products.find((product) => product.id == productId);
  const existedProduct = cart.find(
    (cartProduct) => cartProduct.id == productId
  );
  if (!cart.length || !existedProduct) {
    product.quantity = 1;
    cart.push(product);
  } else {
    existedProduct.quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  showToast();
};

fetchGoods().then((products) => {
  setProducts(products);

  catalog.onclick = (event) => {
    let target = event.target;

    if (!target.classList.contains("cart-add-button")) return;

    const productId = target.getAttribute("data-product-id");
    addToCart(products, productId);
  };
});

fetchCategories().then((categories) => {
  setCategories(categories);
});

filterButton.onclick = () => {
  const filterCategory = document.querySelector(
    'input[name="product-group"]:checked'
  ).value;
  const priceMin = document.querySelector(".price-slider-min").value;
  const priceMax = document.querySelector(".price-slider-max").value;
  fetchCategoryProducts(filterCategory).then((products) => {
    products = products.filter(
      (product) => product.price < priceMax && product.price > priceMin
    );
    setProducts(products);
  });
};
