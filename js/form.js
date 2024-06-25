import { setDisabledState } from './util.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const uploadPhotoElement = adForm.querySelector('.ad-form-header__input');
const sliderElement = adForm.querySelector('.ad-form__slider');

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');

  setDisabledState(adFormElements, true);

  uploadPhotoElement.disabled = true;
  sliderElement.disabled = true;
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');

  setDisabledState(adFormElements, false);

  uploadPhotoElement.disabled = false;
  sliderElement.disabled = false;
};

document.addEventListener('DOMContentLoaded', () => {
  disableForm();
});

export { enableForm };
