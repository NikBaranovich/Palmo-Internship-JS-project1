const phoneInput = document.getElementById("appointment-phone");
const nameInput = document.getElementById("appointment-name");

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
const username = getCookie("name");
const surname = getCookie("surname");

nameInput.value = username && surname? `${username} ${surname}` : ``;
phoneInput.value = getCookie("phone") || "";

phoneInput.addEventListener("input", function () {
  let cleanedValue = phoneInput.value.replace(/\D/g, ""); //remove all non-numeric characters

  if (cleanedValue.length > 10) {
    cleanedValue = cleanedValue.slice(0, 10);
  }

  let formattedValue = "";
  for (let i = 0; i < cleanedValue.length; i++) {
    if (i === 0) {
      formattedValue = "(";
    } else if (i === 3) {
      formattedValue += ") ";
    } else if (i === 6) {
      formattedValue += "-";
    }
    formattedValue += cleanedValue[i];
  }
  phoneInput.value = formattedValue;
});
