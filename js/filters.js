import { setDisabledState } from './util.js';
import { renderSimilarMarkers } from './map.js';

const SIMILAR_MARKERS_COUNT = 10;

const mapFiltersForm = document.querySelector('.map__filters');
const filterElements = mapFiltersForm.querySelectorAll('.map__filter');
const featuresElement = mapFiltersForm.querySelector('.map__features');

const housingTypeSelectElement = document.querySelector('#housing-type');

const disableFilters = () => {
  mapFiltersForm.classList.add('map__filters--disabled');

  setDisabledState(filterElements, true);

  featuresElement.disabled = true;
};

const enableFilters = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');

  setDisabledState(filterElements, false);

  featuresElement.disabled = false;
};

disableFilters();

//Сброс всех фильтров

const resetFilters = () => mapFiltersForm.reset();

//Фильтрация по типу жилья

const setFilterByType = (ads) => {
  housingTypeSelectElement.addEventListener('change', () => {
    const currentSelectValue = housingTypeSelectElement.options[housingTypeSelectElement.selectedIndex].value;
    const filteredAds = ads.filter((ad) => {
      if (currentSelectValue === 'any') {
        return ad;
      }
      return ad.offer.type === currentSelectValue;
    });
    renderSimilarMarkers(filteredAds.slice(0, SIMILAR_MARKERS_COUNT));
  });
};

const initFilters = (ads) => {
  enableFilters();
  setFilterByType(ads);
};

export { enableFilters, resetFilters, initFilters };
