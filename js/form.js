import { setDisabledState } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const uploadPhotoElement = adForm.querySelector('.ad-form-header__input');
const sliderElement = adForm.querySelector('.ad-form__slider');

const titleFieldElement = adForm.querySelector('#title');
const guestAmountElement = adForm.querySelector('#capacity');
const roomAmountElement = adForm.querySelector('#room_number');
const roomGuestRatio = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

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

pristine.addValidator(titleFieldElement, validateTitle, `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`);

//Валидация количества мест в зависимости от количества комнат

const validateGuestAmount = (value) => {
  const roomsActualAmount = roomAmountElement.options[roomAmountElement.selectedIndex].value;

  const result = roomGuestRatio[roomsActualAmount].some((item) => item === value);

  return result;
};

const getGuestAmountErrorMessage = () => 'Значение не подходит для выбранного количества комнат';

pristine.addValidator(guestAmountElement, validateGuestAmount, getGuestAmountErrorMessage);

//Общая валидация формы

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
