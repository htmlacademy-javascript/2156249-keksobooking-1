import { setDisabledState } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const filterElements = mapFiltersForm.querySelectorAll('.map__filter');
const featuresElement = mapFiltersForm.querySelector('.map__features');

const disableFilters = () => {
  mapFiltersForm.classList.add('map__filters--disabled');

  setDisabledState(filterElements, true);

  featuresElement.disabled = true;
};

disableFilters();

const enableFilters = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');

  setDisabledState(filterElements, false);

  featuresElement.disabled = false;
};

document.addEventListener('DOMContentLoaded', () => {
  enableFilters();
});

