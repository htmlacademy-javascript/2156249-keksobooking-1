import { sliderElement, priceElement } from './form.js';

const MAX_PRICE = 100000;
const STEP = 1;


noUiSlider.create(sliderElement, {
  range: {
    min: parseInt(priceElement.min, 10),
    max: MAX_PRICE,

  },
  start: parseInt(priceElement.min, 10),
  step: STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    start: priceElement.value,
  });
});
