import { setDisabledState } from './util.js';
import { renderSimilarMarkers } from './map.js';

const SIMILAR_MARKERS_COUNT = 10;

const priceFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const mapFiltersForm = document.querySelector('.map__filters');
const filterElements = mapFiltersForm.querySelectorAll('.map__filter');

const featuresElement = mapFiltersForm.querySelector('.map__features');
const featuresCheckboxElements = featuresElement.querySelectorAll('.map__checkbox');

const typeSelectElement = document.querySelector('#housing-type');
const priceSelectElement = document.querySelector('#housing-price');
const roomSelectElement = document.querySelector('#housing-rooms');
const guestSelectElement = document.querySelector('#housing-guests');

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

//Фильтрация по различным типам

const filterByType = (ad) => {
  const value = typeSelectElement.value;
  if (value === 'any') {
    return true;
  }
  return value === ad.offer.type;
};

const filterByPrice = (ad) => {
  const value = priceSelectElement.value;
  if (value === 'any') {
    return true;
  }
  return ad.offer.price >= priceFilter[value].start && ad.offer.price <= priceFilter[value].end;
};

const filterByRoom = (ad) => {
  const value = roomSelectElement.value;
  if (value === 'any') {
    return true;
  }
  return +value === ad.offer.rooms;
};

const filterByGuest = (ad) => {
  const value = guestSelectElement.value;
  if (value === 'any') {
    return true;
  }
  return +value === ad.offer.guests;
};

const filterByFeatures = (ad) => {
  const checkedFeatures = Array.from(featuresCheckboxElements)
    .filter((feature) => feature.checked);

  return checkedFeatures.every((feature) => {
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(feature.value);
  });
};

//Общая фильтрация
const setFilters = (ads) => {
  mapFiltersForm.addEventListener('change', () => {
    const filteredAds = ads.filter((ad) =>
      filterByType(ad) &&
      filterByPrice(ad) &&
      filterByRoom(ad) &&
      filterByGuest(ad) &&
      filterByFeatures(ad)
    );

    renderSimilarMarkers(filteredAds.slice(0, SIMILAR_MARKERS_COUNT));
  });

};

const initFilters = (ads) => {
  enableFilters();
  setFilters(ads);
};

export { enableFilters, resetFilters, initFilters };
