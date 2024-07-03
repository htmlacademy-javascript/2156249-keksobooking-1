import { enableForm } from './form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
    enableForm();
  })
  .setView({
    lat: 35.6421,
    lng: 139.8302,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
).addTo(map);
