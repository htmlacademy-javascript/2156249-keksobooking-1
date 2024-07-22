import { adForm } from './form.js';
import { filtersReset } from './filters.js';
import { resetMarker, closePopup } from './map.js';

const resetButtonElement = adForm.querySelector('.ad-form__reset');

const resetAll = () => {
  adForm.reset();
  filtersReset();
  resetMarker();
  closePopup();
};

resetButtonElement.addEventListener('click', () => resetAll());

export { resetAll };
