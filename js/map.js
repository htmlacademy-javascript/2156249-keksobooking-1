import { enableForm, adForm } from './form.js';
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

//Добавляем метки из сгенерированных данных на карту

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//Создаем слой, на который будем добавлять метки

const markerGroup = L.layerGroup().addTo(map);

//Создаем однин маркер

const createMarker = (ad) => {
  const similarMarker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon
    },
  );

  similarMarker
    .addTo(markerGroup)
    .bindPopup(createAdElement(ad));
};

// Возвращаем карту в исходное состояние (возвращаем маркер на место и закрываем попап)

const resetMap = () => {
  marker.setLatLng([DefaultLocationForMarker.LAT, DefaultLocationForMarker.LNG]);
  map.closePopup();
};

//Создаем несколько маркеров

const renderSimilarMarkers = (ads) => {
  markerGroup.clearLayers();
  map.closePopup();
  ads.forEach((similarAd) => createMarker(similarAd));
};

export { renderSimilarMarkers, resetMap };
