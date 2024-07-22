// Функция, которая
// +? все заполненные поля возвращает в изначальное состояние
// + сбрасывае фильтры
// ??  сбрасывает отфильтрованные метки
// ?? возвращает метку адреса в исходное положение
// возвращает значение поля адреса соответственно исходному положению метки
// закрывает открытый балун

import { adForm } from './form.js';
import { filtersReset } from './filters.js';
// import { resetMarker } from './map.js';

const resetButtonElement = adForm.querySelector('.ad-form__reset');

const resetAll = () => {
  adForm.reset();
  filtersReset();
  // resetMarker();
};

resetButtonElement.addEventListener('click', () => resetAll());

export { resetAll };
