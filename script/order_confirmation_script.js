const shopButton = document.getElementsByClassName("shop-button")[0];

const redirectTo = (page) => {
  window.location.href = page;
};

shopButton.onclick = (event) => {
  redirectTo("catalog.html");
};
