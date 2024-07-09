import { priceElement, accommodationTypeElement, typePriceRatio } from './form.js';

const MAX_PRICE = 100000;

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: typePriceRatio['flat'],
    max: MAX_PRICE,

  },
  start: typePriceRatio['flat'],
  step: 1,
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

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

accommodationTypeElement.addEventListener('change', () => {
  const actualType = accommodationTypeElement.options[accommodationTypeElement.selectedIndex].value;

  if (actualType === 'house') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: typePriceRatio['house'],
        max: MAX_PRICE,
      },
      start: typePriceRatio['house'],
      step: 1,
    });
  } else if (actualType === 'palace') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: typePriceRatio['palace'],
        max: MAX_PRICE,
      },
      start: typePriceRatio['palace'],
      step: 1,
    });
  } else if (actualType === 'bungalow') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: typePriceRatio['bungalow'],
        max: MAX_PRICE,
      },
      start: typePriceRatio['bungalow'],
      step: 1,
    });
  } else if (actualType === 'hotel') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: typePriceRatio['hotel'],
        max: MAX_PRICE,
      },
      start: typePriceRatio['hotel'],
      step: 1,
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: typePriceRatio['flat'],
        max: MAX_PRICE,
      },
      start: typePriceRatio['flat'],
      step: 1,
    });
  }
});
