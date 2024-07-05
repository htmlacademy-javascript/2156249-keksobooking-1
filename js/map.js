import { enableForm, adForm } from './form.js';
import { enableFilters } from './filters.js';
import { createSimilarAds } from './data.js';
import { createAdElement } from './render-ad.js';
import { roundCoordinates } from './util.js';

const DefaultLocationForMap = {
  LAT: 35.6421,
  LNG: 139.8302,
};

const DefaultLocationForMarker = {
  LAT: 35.6573,
  LNG: 139.7823,
};

const addressFieldElement = adForm.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
    enableFilters();
    addressFieldElement.value = `${DefaultLocationForMarker.LAT}, ${DefaultLocationForMarker.LNG}`;
  })
  .setView({
    lat: DefaultLocationForMap.LAT,
    lng: DefaultLocationForMap.LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: DefaultLocationForMarker.LAT,
    lng: DefaultLocationForMarker.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  const actualLocation = evt.target.getLatLng();
  const actualLat = roundCoordinates(actualLocation.lat, 5);
  const actualLng = roundCoordinates(actualLocation.lng, 5);
  addressFieldElement.value = `${actualLat}, ${actualLng}`;
});

//Добавляем метки из сгенерированных днных на карту

const similarAds = createSimilarAds();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

similarAds.forEach((similarAd) => {
  const similarAdsMarker = L.marker(
    {
      lat: similarAd.location.lat,
      lng: similarAd.location.lng,
    },
    {
      icon
    },
  );

  similarAdsMarker
    .addTo(map)
    .bindPopup(createAdElement(similarAd, popupTemplate));
});
