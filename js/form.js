const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const uploadPhotoElement = adForm.querySelector('.ad-form-header__input');
const sliderElement = adForm.querySelector('.ad-form__slider');

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.children;

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');

  for (const adFormElement of adFormElements) {
    adFormElement.setAttribute('disabled', '');
  }

  for (const mapFiltersFormElement of mapFiltersFormElements) {
    mapFiltersFormElement.setAttribute('disabled', '');
  }

  uploadPhotoElement.setAttribute('disabled', '');
  sliderElement.setAttribute('disabled', '');
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  for (const adFormElement of adFormElements) {
    adFormElement.removeAttribute('disabled');
  }

  uploadPhotoElement.removeAttribute('disabled');
  sliderElement.removeAttribute('disabled');
};

const enableMapFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');

  for (const mapFiltersFormElement of mapFiltersFormElements) {
    mapFiltersFormElement.removeAttribute('disabled');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  disableForms();
});

export { enableAdForm, enableMapFiltersForm };
