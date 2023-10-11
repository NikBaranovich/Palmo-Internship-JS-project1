<!-- Lesson1 Task 6: Create a text input form and bind the input value to a property on the Vue object. Print the entered text on the page. -->
<template lang="">
  <form action="../blank.html" metod="post" id="appointment-form">
    <p class="appointment-item">
      <label for="appointment-date">Date</label>
      <input id="appointment-date" type="date" name="date" />
    </p>
    <p class="appointment-item">
      <label for="appointment-time">Time</label>
      <input type="time" name="time" id="appointment-time" />
    </p>
    <p class="appointment-item">
      <label for="appointment-name">{{ store.count }} Your name: {{ appointmentName }}</label>
      <input
        type="text"
        name="name"
        id="appointment-name"
        placeholder="Full name here"
        v-model="appointmentName"
      />
    </p>
    <p class="appointment-item">
      <label for="appointment-phone">Phone number: {{ appointmentPhone }}</label>
      <input
        type="tel"
        name="phone"
        id="appointment-phone"
        placeholder="(123) 456-7890"
        v-model="appointmentPhone"
      />
    </p>
    <button type="submit" class="button">Send</button>
  </form>
</template>

<script setup>
import { store } from "../script/store.mjs";
</script>

<script>
export default {
  name: "AppointmentForm",
  data() {
    return {
      appointmentPhone: "",
      appointmentName: "",
    };
  },
  setup() {
    // const store2 = store
  },
};
</script>

<style lang=""></style>
