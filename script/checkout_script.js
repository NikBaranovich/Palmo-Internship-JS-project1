const orderForm = document.getElementById("order-form");
const nameInput = document.getElementById("name");
const nameErrorLabel = document.getElementById("name-error");
const surnameInput = document.getElementById("surname");
const surnameErrorLabel = document.getElementById("surname-error");
const phoneInput = document.getElementById("phone");
const phoneErrorLabel = document.getElementById("phone-error");
const emailInput = document.getElementById("email");
const emailErrorLabel = document.getElementById("email-error");
const orderButton = document.getElementsByClassName("order-button")[0];

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

const validateName = (nameInput, nameErrorLabel) => {
  const restrictedSymbols = [".", "_", "/", "\\", "|", ","];

  for (const symbol of restrictedSymbols) {
    if ([...nameInput.value].includes(symbol)) {
      nameErrorLabel.innerHTML = `Must not contain characters: '${restrictedSymbols.join(
        "',  '"
      )}'`;
      nameInput.classList.add("validation-error-input");
      return false;
    }
  }
  if (nameInput.value.length < 3 || nameInput.value.length > 20) {
    nameErrorLabel.innerHTML = `Must be at least 3 and no more than 20 characters`;
    nameInput.classList.add("validation-error-input");
    return false;
  }
  nameErrorLabel.innerHTML = ``;
  nameInput.classList.remove("validation-error-input");
  return true;
};
const checkIfEmailCorrect = (email) => {
  const atSymbol = email.indexOf("@");
  const dotSymbol = email.lastIndexOf(".");
  const spaceSymbol = email.indexOf(" ");
  return (
    atSymbol != -1 &&
    atSymbol != 0 &&
    dotSymbol != -1 &&
    dotSymbol != 0 &&
    dotSymbol > atSymbol + 1 &&
    email.length > dotSymbol + 1 &&
    spaceSymbol == -1
  );
};
const validateEmail = (emailInput, emailErrorLabel) => {
  if (!checkIfEmailCorrect(emailInput.value)) {
    emailErrorLabel.innerHTML = "Email address is not valid";
    emailInput.classList.add("validation-error-input");
    return false;
  }
  emailErrorLabel.innerHTML = ``;
  emailInput.classList.remove("validation-error-input");
  return true;
};
const validatePhone = (phoneInput, phoneErrorLabel) => {
  if (phoneInput.value.length < 10) {
    phoneErrorLabel.innerHTML = "Phone is not valid";
    phoneInput.classList.add("validation-error-input");
    return false;
  }
  phoneErrorLabel.innerHTML = ``;
  phoneInput.classList.remove("validation-error-input");
  return true;
};

const validateInput = () => {
  const isNameValid = validateName(nameInput, nameErrorLabel);
  const isSurnameValid = validateName(surnameInput, surnameErrorLabel);
  const isEmailValid = validateEmail(emailInput, emailErrorLabel);
  const isPhoneValid = validatePhone(phoneInput, phoneErrorLabel);

  if (isNameValid && isSurnameValid && isEmailValid && isPhoneValid) {
    return true;
  }
  return false;
};

const setCookie = (name, value, options = {}) => {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

orderForm.onsubmit = (event) => {
  event.preventDefault();
  if (!validateInput()) {
    return;
  }
  setCookie("name", nameInput.value, { "max-age": 3600 });
  setCookie("surname", surnameInput.value, { "max-age": 3600 });
  setCookie("phone", phoneInput.value, { "max-age": 3600 });
  window.location.href = "index.html";
};
