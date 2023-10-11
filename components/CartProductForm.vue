<template lang="">
  <div>
    <li class="cart-item" v-for="item in cartItems">
      <div class="cart-main-wrapper">
        <a href="../blank.html" class="cart-product-display">
          <h3>
            <span class="cart-item-title">"{{ item.title }}"</span>
          </h3>

          <img class="cart-item-image" v-bind:src="item.image" v-bind:alt="item.title" />
        </a>

        <button class="cart-delete-button" @click="deleteProduct(item)">
          <img class="cart-delete-image" src="../pictures/svg/delete_icon.svg" />
        </button>
      </div>
      <div class="cart-price-wrapper">
        <div class="cart-counter">
          <button class="quantity-button quantity-button-minus" @click="decrementProduct(item)">
            <img class="quantity-button-image" src="../pictures/svg/minus_icon.svg" />
          </button>
          <input
            type="number"
            name="quantity"
            class="cart-item-quantity"
            v-bind:value="item.quantity"
          />
          <!-- Lesson1 Task 4: Add a button to your existing project that will change the value of your variable in the Vue object on each click. -->
          <button class="quantity-button quantity-button-plus" @click="incrementProduct(item)">
            <img class="quantity-button-image" src="../pictures/svg/plus_icon.svg" />
          </button>
        </div>
        <p class="cart-item-price">
          <b>{{ productTotalPrice(item) }} $</b>
        </p>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  // Task 8: Create event handlers that respond to click events and change the state of your Vue object.
  methods: {
    incrementProduct(product) {
      this.$emit("incrementProduct", product);
    },
    decrementProduct(product) {
      this.$emit("decrementProduct", product);
    },
    deleteProduct(product) {
      this.$emit("deleteProduct", product);
    },
  },
  computed: {
    productTotalPrice() {
      return product => product.price * product.quantity;
    },
  },
};
</script>
<style lang=""></style>
