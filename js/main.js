import './render-ad.js';
import { setAdFormSubmit } from './form.js';
import './filters.js';
import { renderSimilarMarkers } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const SIMILAR_MARKERS_COUNT = 10;

setAdFormSubmit();

getData()
  .then((ads) => {
    renderSimilarMarkers(ads.slice(0, SIMILAR_MARKERS_COUNT));
  })
  .catch((err) => {
    showAlert(err.message);
  }
  );
