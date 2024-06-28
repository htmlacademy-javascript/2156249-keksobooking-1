import { setDisabledState } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const uploadPhotoElement = adForm.querySelector('.ad-form-header__input');
const sliderElement = adForm.querySelector('.ad-form__slider');

const titleElement = adForm.querySelector('#title'); //если у элемента нет класса, могу ли я искать по id или это нарушения критерия про единообразие?

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');

  setDisabledState(adFormElements, true);

  uploadPhotoElement.disabled = true;
  sliderElement.disabled = true;
};

disableForm();

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');

  setDisabledState(adFormElements, false);

  uploadPhotoElement.disabled = false;
  sliderElement.disabled = false;
};

document.addEventListener('DOMContentLoaded', () => {
  enableForm();
});

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

//Валидация заголовка объявления

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(titleElement, validateTitle, `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`);

//Валидация количества комнат и количества мест

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
