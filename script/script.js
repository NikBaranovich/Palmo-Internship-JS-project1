const options = {
  moduleCache: {
    vue: Vue,
  },
  async getFile(url) {
    const res = await fetch(url);
    if (!res.ok) throw Object.assign(new Error(res.statusText + " " + url), { res });
    return {
      getContentData: (asBinary) => (asBinary ? res.arrayBuffer() : res.text()),
    };
  },
  handleModule: async (type, getContentData, path, options) => {
    switch (type) {
      case ".svg":
        return path;
      case ".jpg":
        return path;
      case ".png":
        return path;
    }
  },
  addStyle(textContent) {
    const style = Object.assign(document.createElement("style"), { textContent });
    const ref = document.head.getElementsByTagName("style")[0] || null;
    document.head.insertBefore(style, ref);
  },
};

const { loadModule } = window["vue3-sfc-loader"];

// Lesson1 Task 2: Create a Vue main object and bind it to some HTML element on your page.
const cart = Vue.createApp({
  components: {
    cart: Vue.defineAsyncComponent(() => loadModule("../components/ModalCart.vue", options)),
  },
  template: "<cart></cart>",
});
cart.mount("#modal-cart");

// Lesson1 Task 9: Create a Vue child object and bind it to some HTML element on your page.
const appointmentForm = Vue.createApp({
  components: {
    appointmentForm: Vue.defineAsyncComponent(() =>
      loadModule("../components/AppointmentForm.vue", options)
    ),
  },
  template: "<appointmentForm></appointmentForm>",
});
appointmentForm.mount("#appointment-form");

// const phoneInput = document.getElementById("appointment-phone");
// const nameInput = document.getElementById("appointment-name");

// function getCookie(name) {
//   let matches = document.cookie.match(
//     new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
//   );
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// const username = getCookie("name");
// const surname = getCookie("surname");

// nameInput.value = username && surname ? `${username} ${surname}` : ``;
// phoneInput.value = getCookie("phone") || "";

// phoneInput.addEventListener("input", function () {
//   let cleanedValue = phoneInput.value.replace(/\D/g, ""); //remove all non-numeric characters

//   if (cleanedValue.length > 10) {
//     cleanedValue = cleanedValue.slice(0, 10);
//   }

//   let formattedValue = "";
//   for (let i = 0; i < cleanedValue.length; i++) {
//     if (i === 0) {
//       formattedValue = "(";
//     } else if (i === 3) {
//       formattedValue += ") ";
//     } else if (i === 6) {
//       formattedValue += "-";
//     }
//     formattedValue += cleanedValue[i];
//   }
//   phoneInput.value = formattedValue;
// });
