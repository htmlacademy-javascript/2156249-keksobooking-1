import { createSimilarAds } from './data.js';
import { renderAd } from './render-ad.js';
import './form.js';

const similarAds = createSimilarAds();

renderAd(similarAds[0]);
