import { enableForm, adForm } from './form.js';
import { enableFilters } from './filters.js';

const DEFAULT_LOCATION = {
  lat: 35.6421,
  lng: 139.8302,
};

const addressFieldElement = adForm.querySelector('#address');
addressFieldElement.readOnly = true;

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
    enableFilters();
    addressFieldElement.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;
  })
  .setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
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
    lat: 35.6573,
    lng: 139.7823,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

const roundCoordinates = (coordinate, decimals) => Number(coordinate.toFixed(decimals));

marker.on('moveend', (evt) => {
  const actualLocation = evt.target.getLatLng();
  const actualLat = roundCoordinates(actualLocation.lat, 5);
  const actualLng = roundCoordinates(actualLocation.lng, 5);
  addressFieldElement.value = `${actualLat}, ${actualLng}`;
});
