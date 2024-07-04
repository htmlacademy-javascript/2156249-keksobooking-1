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

const accommodationTypeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const typePriceRatio = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const checkInElement = adForm.querySelector('#timein');
const ckeckoutOutElement = adForm.querySelector('#timeout');

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

  priceElement.setAttribute('min', 1000);
};

disableForm();

//Подключение библиотеки Pristine - основные настройки

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

//Валидация заголовка объявления

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(titleFieldElement, validateTitle, `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`);

//Валидация количества гостей в зависимости от количества комнат

const validateGuestAmount = (value) => {
  const roomsActualAmount = roomAmountElement.options[roomAmountElement.selectedIndex].value;

  const result = roomGuestRatio[roomsActualAmount].some((item) => item === value);

  return result;
};

const getGuestAmountErrorMessage = () => 'Значение не подходит для выбранного количества комнат';

pristine.addValidator(guestAmountElement, validateGuestAmount, getGuestAmountErrorMessage);

// Валидация при изменении количества комнат

const onRoomAmountOptionChange = () => {
  const roomsActualAmount = roomAmountElement.options[roomAmountElement.selectedIndex].value;
  const roomGuestRatioArray = roomGuestRatio[roomsActualAmount];
  const isValueInArray = roomGuestRatioArray.includes('guestAmountElement.value');

  pristine.validate(isValueInArray);
};

roomAmountElement.addEventListener('change', onRoomAmountOptionChange);

//Валидация минимальной цены за ночь в зависимости от типа жилья

const validateMinPrice = (value) => value >= parseInt(priceElement.min, 10);

const minPriceErrorMessage = () => `Минимальная цена ${priceElement.min}`;

pristine.addValidator(priceElement, validateMinPrice, minPriceErrorMessage);

const onTypeOptionChange = () => {
  const actualType = accommodationTypeElement.options[accommodationTypeElement.selectedIndex].value;
  priceElement.placeholder = typePriceRatio[actualType];
  priceElement.setAttribute('min', typePriceRatio[actualType]);

  pristine.validate(priceElement);
};

accommodationTypeElement.addEventListener('change', onTypeOptionChange);

//Синхронизация времени заезда и выезда

const onCheckInOptionChange = () => {
  const actualCheckIn = checkInElement.options[checkInElement.selectedIndex].value;
  ckeckoutOutElement.value = actualCheckIn;
};

const onCheckOutOptionChange = () => {
  const actualCheckOut = ckeckoutOutElement.options[ckeckoutOutElement.selectedIndex].value;
  checkInElement.value = actualCheckOut;
};

checkInElement.addEventListener('change', onCheckInOptionChange);
ckeckoutOutElement.addEventListener('change', onCheckOutOptionChange);

//Общая валидация формы

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

export { enableForm };
