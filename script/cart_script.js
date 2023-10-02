const cartButton = document.querySelector(".cart");
const cartPopup = document.querySelector(".modal-back");
const cartClose = cartPopup.querySelector(".modal-close");
const cartList = cartPopup.querySelector(".cart-list");
const cartReceiptSumLabel = cartPopup.querySelector(".cart-receipt-sum");
const body = document.querySelector("body");

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}
let cartItems = JSON.parse(localStorage.getItem("cart"));

cartButton.onclick = (event) => {
  event.preventDefault();
  setTotalSum(cartItems);
  cartPopup.classList.add("modal-show");
  body.style.overflow = "hidden";
  cartList.childElementCount = 0;
  cartList.innerHTML = cartItems.reduce(
    (layout, product) =>
      (layout += `
      <li class="cart-item" data-product-id="${product.id}">
      <div class="cart-main-wrapper">
        <a href="./blank.html" class="cart-product-display">
          <h3>
            <span class="cart-item-title">"${product.title}"</span>
          </h3>

          <img
            class="cart-item-image"
            src="${product.image}"
            alt="${product.title}"
          />
        </a>

        <button class="cart-delete-button">
          <img
            class="cart-delete-image"
            src="./pictures/svg/delete_icon.svg"
            
          />
        </button>
      </div>
      <div class="cart-price-wrapper">
        <div class="cart-counter">
          <button class="quantity-button quantity-button-minus">
            <img
              class="quantity-button-image"
              src="./pictures/svg/minus_icon.svg"
              data-product-id="${product.id}"
            />
          </button>
          <input
            type="number"
            name="quantity"
            class="cart-item-quantity"
            value="${product.quantity}"
            data-product-id="${product.id}"
          />
          <button class="quantity-button quantity-button-plus">
            <img
              class="quantity-button-image"
              src="./pictures/svg/plus_icon.svg"
              data-product-id="${product.id}"
            />
          </button>
        </div>
        <p class="cart-item-price">
          <b>${(product.price * product.quantity).toFixed(2)} $</b>
        </p>
      </div>
    </li>`),
    ``
  );
  if (cartList.childElementCount == 0) {
    cartList.innerHTML = `<p class = "empty-cart-label">Cart is empty</p>`;
    return;
  }
};

cartClose.onclick = (event) => {
  event.preventDefault();
  body.style.overflow = "auto";
  cartPopup.classList.remove("modal-show");
};
const setTotalSum = (cartItems) => {
  const receiptSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartReceiptSumLabel.textContent = `${receiptSum.toFixed(2)}$`;
};
cartList.onclick = (event) => {
  let target = event.target;

  if (target.parentElement.classList.contains("quantity-button-plus")) {
    const product = findParentWithClass(target, "cart-item");
    const quantityInput = product.querySelector(".cart-item-quantity");
    const priceLabel = product.querySelector(".cart-item-price");

    const productId = product.getAttribute("data-product-id");
    const item = cartItems.find((item) => item.id == productId);

    item.quantity++;
    quantityInput.value++;
    priceLabel.innerText = `${(item.price * item.quantity).toFixed(2)} $`;
    localStorage.setItem("cart", JSON.stringify(cartItems));

    setTotalSum(cartItems);
  }
  if (target.parentElement.classList.contains("quantity-button-minus")) {
    const product = findParentWithClass(target, "cart-item");
    const quantityInput = product.querySelector(".cart-item-quantity");
    const priceLabel = product.querySelector(".cart-item-price");

    const productId = product.getAttribute("data-product-id");
    const item = cartItems.find((item) => item.id == productId);

    if (item.quantity > 1) {
      item.quantity--;
      quantityInput.value--;
      priceLabel.innerText = `${(item.price * item.quantity).toFixed(2)} $`;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotalSum(cartItems);
  }
  if (target.parentElement.classList.contains("cart-delete-button")) {
    const product = findParentWithClass(target, "cart-item");

    const productId = product.getAttribute("data-product-id");
    const item = cartItems.find((item) => item.id == productId);

    cartItems.splice(cartItems.indexOf(item), 1);
    product.remove();
    if (cartList.childElementCount == 0) {
      cartList.innerHTML = `<p class = "empty-cart-label">Cart is empty</p>`;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotalSum(cartItems);
  }
};
cartList.addEventListener("change", (event) => {
  let target = event.target;

  if (target.classList.contains("cart-item-quantity")) {
    const product = findParentWithClass(target, "cart-item");
    const productId = product.getAttribute("data-product-id");
    const item = cartItems.find((item) => item.id == productId);
    const priceLabel = product.querySelector(".cart-item-price");
    item.quantity = target.value;
    priceLabel.innerText = `${(item.price * item.quantity).toFixed(2)} $`;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotalSum(cartItems);
  }
});
const findParentWithClass = (element, className) => {
  while (element && !element.classList.contains(className)) {
    element = element.parentElement;
  }

  if (element && element.classList.contains(className)) {
    return element;
  } else {
    return null;
  }
};
