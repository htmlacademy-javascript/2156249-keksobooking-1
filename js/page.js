import { adForm } from './form.js';
import { resetFilters } from './filters.js';
import { resetMap } from './map.js';

const resetButtonElement = adForm.querySelector('.ad-form__reset');

const resetPage = () => {
  adForm.reset();
  resetFilters();
  resetMap();
};

resetButtonElement.addEventListener('click', () => resetPage());

export { resetPage };
