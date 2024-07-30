import { setDisabledState } from './util.js';
import { renderSimilarMarkers } from './map.js';


const SIMILAR_MARKERS_COUNT = 10;

const mapFiltersForm = document.querySelector('.map__filters');
const filterElements = mapFiltersForm.querySelectorAll('.map__filter');
const featuresElement = mapFiltersForm.querySelector('.map__features');

const typeSelectElement = document.querySelector('#housing-type');
//const priceSelectElement = document.querySelector('#housing-price');

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

// const filterByType = (ad) => {
//   const value = typeSelectElement.value;
//   if (value === 'any') {
//     return true;
//   }
//   return value === ad.offer.type;
// };

const setFilterByType = (ads) => {
  typeSelectElement.addEventListener('change', () => {
    const filteredAds = ads.filter((ad) => {
      if (typeSelectElement.value === 'any') {
        return ad;
      }
      return ad.offer.type === typeSelectElement.value;
    });
    renderSimilarMarkers(filteredAds.slice(0, SIMILAR_MARKERS_COUNT));
  });
};

//Фильтрация по цене

// const setFilterByPrice = (ads) => {
//   priceSelectElement.addEventListener('change', () => {
//     const currentSelectValue = priceSelectElement.options[priceSelectElement.selectedIndex].value;
//     const filteredAds = ads.filter((ad) => {
//       if (currentSelectValue === 'middle') {
//         return ad.offer.price >= 10000 && ad.offer.price <= 50000;
//       } else if (currentSelectValue === 'low') {
//         return ad.offer.price < 10000;
//       } else if (currentSelectValue === 'high') {
//         return ad.offer.price > 50000;
//       } else {
//         return ad;
//       }
//     });
//     renderSimilarMarkers(filteredAds.slice(0, SIMILAR_MARKERS_COUNT));
//   });
// };


const initFilters = (ads) => {
  enableFilters();
  setFilterByType(ads);
};

export { enableFilters, resetFilters, initFilters };
