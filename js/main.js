import './render-ad.js';
import { setAdFormSubmit } from './form.js';
import { initFilters } from './filters.js';
import { renderSimilarMarkers } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { resetPage } from './page.js';
import './photos.js';

const SIMILAR_MARKERS_COUNT = 10;

setAdFormSubmit(resetPage);

getData()
  .then((ads) => {
    renderSimilarMarkers(ads.slice(0, SIMILAR_MARKERS_COUNT));
    initFilters(ads);
  })
  .catch((err) => {
    showAlert(err.message);
  }
  );
