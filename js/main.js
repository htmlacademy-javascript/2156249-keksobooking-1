import './render-ad.js';
import { setAdFormSubmit } from './form.js';
import { enableFilters } from './filters.js';
import { renderSimilarMarkers } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { resetAll } from './reset.js';

const SIMILAR_MARKERS_COUNT = 10;

setAdFormSubmit(resetAll);

getData()
  .then((ads) => {
    renderSimilarMarkers(ads.slice(0, SIMILAR_MARKERS_COUNT));
  })
  .then(() => enableFilters())
  .catch((err) => {
    showAlert(err.message);
  }
  );
