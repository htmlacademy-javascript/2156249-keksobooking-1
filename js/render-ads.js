import { createSimilarAds } from './data.js';

const mapContainer = document.querySelector('.map__canvas');

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAds = createSimilarAds();

const ads = [];

similarAds.forEach((similarAd) => {
  const adElement = similarAdTemplate.cloneNode(true);

  const featureContainer = adElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const modifiers = similarAd.offer.features.map((feature) => `popup__feature--${feature}`);

  const photoContainer = adElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  const fragment = document.createDocumentFragment(); // Создаём "коробочку"

  adElement.querySelector('.popup__title').textContent = similarAd.offer.title;
  adElement.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  adElement.querySelector('.popup__text--price').textContent = similarAd.offer.price;
  switch (similarAd.offer.type) {
    case 'palace':
      adElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      adElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      adElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalow':
      adElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'hotel':
      adElement.querySelector('.popup__type').textContent = 'Отель';
      break;
  }
  adElement.querySelector('.popup__text--capacity').textContent = `${similarAd.offer.rooms} комнаты для ${similarAd.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}`;
  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
  adElement.querySelector('.popup__description').textContent = similarAd.offer.description;

  similarAd.offer.photos.forEach((offerPhoto) => {
    photoContainer.innerHTML = '';
    const photo = photoTemplate.cloneNode(true);

    photo.src = `${offerPhoto}`;
    fragment.appendChild(photo);
  });
  photoContainer.appendChild(fragment);

  adElement.querySelector('.popup__avatar').src = similarAd.author.avatar;
  ads.push(adElement);
});

mapContainer.append(ads[0]);
