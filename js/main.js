import { createSimilarAds } from './data.js';
import './render-ad.js';
import './form.js';
import './filters.js';
import { renderSimilarMarkers } from './map.js';
import './slider.js';

const similarAds = createSimilarAds();
renderSimilarMarkers(similarAds);
