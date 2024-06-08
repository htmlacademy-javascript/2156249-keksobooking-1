const typeMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const mapContainer = document.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');


const createFeatures = (adElement, ad) => {
  const featureContainer = adElement.querySelector('.popup__features');
  const fragment = document.createDocumentFragment();

  if (!ad.offer.features || ad.offer.features.length === 0) {
    featureContainer.remove();
  } else {
    featureContainer.innerHTML = '';
    ad.offer.features.forEach((offerFeature) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(`popup__feature--${offerFeature}`);
      fragment.appendChild(feature);
    });
  }
  featureContainer.appendChild(fragment);
};

const createPhotos = (adElement, ad) => {
  const photoContainer = adElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  const fragment = document.createDocumentFragment();

  if (!ad.offer.photos || ad.offer.photos.length === 0) {
    photoContainer.remove();
  } else {
    ad.offer.photos.forEach((offerPhoto) => {
      photoContainer.innerHTML = '';
      const photo = photoTemplate.cloneNode(true);

      photo.src = offerPhoto;
      fragment.appendChild(photo);
    });
    photoContainer.appendChild(fragment);
  }
};

const createAdElement = (ad) => {
  const adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = ad.offer.price;
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;

  createFeatures(adElement, ad);
  createPhotos(adElement, ad);

  switch (ad.offer.type) {
    case 'palace':
      adElement.querySelector('.popup__type').textContent = typeMap.palace;
      break;
    case 'flat':
      adElement.querySelector('.popup__type').textContent = typeMap.flat;
      break;
    case 'house':
      adElement.querySelector('.popup__type').textContent = typeMap.house;
      break;
    case 'bungalow':
      adElement.querySelector('.popup__type').textContent = typeMap.bungalow;
      break;
    case 'hotel':
      adElement.querySelector('.popup__type').textContent = typeMap.hotel;
      break;
  }

  return adElement;
};

const renderAd = (ads) => {
  const adElement = createAdElement(ads[0]);
  mapContainer.appendChild(adElement);
};


export { renderAd };
