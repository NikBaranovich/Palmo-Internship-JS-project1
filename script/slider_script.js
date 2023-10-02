const priceSliderMin = document.querySelector(".price-slider-min");
const priceSliderMax = document.querySelector(".price-slider-max");
priceSliderMin.oninput = () => {
  priceSliderMin.value = Math.min(
    priceSliderMin.value,
    priceSliderMin.parentNode.childNodes[5].value - 1
  );
  var value =
    (100 / (parseInt(priceSliderMin.max) - parseInt(priceSliderMin.min))) *
      parseInt(priceSliderMin.value) -
    (100 / (parseInt(priceSliderMin.max) - parseInt(priceSliderMin.min))) *
      parseInt(priceSliderMin.min);
  var children = priceSliderMin.parentNode.childNodes[1].childNodes;
  children[5].style.left = value + "%";
  children[7].style.left = value + "%";
  children[11].style.left = value + "%";
  children[11].childNodes[1].innerHTML = `${priceSliderMin.value}$`;
};
priceSliderMax.oninput = () => {
  priceSliderMax.value = Math.max(
    priceSliderMax.value,
    priceSliderMax.parentNode.childNodes[3].value - -1
  );
  var value =
    (100 / (parseInt(priceSliderMax.max) - parseInt(priceSliderMax.min))) *
      parseInt(priceSliderMax.value) -
    (100 / (parseInt(priceSliderMax.max) - parseInt(priceSliderMax.min))) *
      parseInt(priceSliderMax.min);
  var children = priceSliderMax.parentNode.childNodes[1].childNodes;
  children[5].style.right = 100 - value + "%";
  children[9].style.left = value + "%";
  children[13].style.left = value + "%";
  children[13].childNodes[1].innerHTML = `${priceSliderMax.value}$`;
};
