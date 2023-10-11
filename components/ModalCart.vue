<!-- Lesson1 Task 5: Create a separate file with the component, register it and add it to the project. -->
<template>
  <div class="modal modal-back" :class="{ 'show-modal': isActive }">
    <section class="modal modal-cart">
      <h2 class="cart-title">Cart</h2>
      <ul class="cart-list">
        <CartProductForm
          :cartItems="cartItems"
          @incrementProduct="incrementProduct"
          @decrementProduct="decrementProduct"
          @deleteProduct="deleteProduct"
        ></CartProductForm>
      </ul>
      <button class="modal-close" type="button" aria-label="Close" @click="closeCart()">
        <img class="modal-close-image" src="../pictures/svg/cross_icon.svg" />
      </button>
      <div class="cart-receipt-wrapper">
        <div class="cart-receipt">
          <p class="cart-receipt-sum">{{ totalSum }} $</p>
          <a href="../checkout.html" class="button button-checkout">Checkout</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { store } from "../script/store.mjs";
store.count = 10;
</script>

<script>
// Lesson1 Task 7: Create another separate component file, register it, and use it in an existing component.
import CartProductForm from "./CartProductForm.vue";
export default {
  name: "ModalCart",
  components: {
    CartProductForm,
  },
  data() {
    return {
      // Lesson1 Task 3: Create a variable in the Vue object and display its value on the page.
      cartItems: [],
      isActive: true,
    };
  },
  mounted() {
    this.$nextTick(function () {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      this.cartItems = cartItems;
    });
  },
  methods: {
    productTotalPrice(product) {
      return product.price * product.quantity;
    },
    incrementProduct(product) {
      product.quantity++;
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    decrementProduct(product) {
      if (product.quantity < 2) {
        return;
      }
      product.quantity--;
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    closeCart() {
      this.isActive = false;
    },
    deleteProduct(product) {
      this.cartItems.splice(this.cartItems.indexOf(product), 1);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
  },
  computed: {
    totalSum() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
};
</script>
