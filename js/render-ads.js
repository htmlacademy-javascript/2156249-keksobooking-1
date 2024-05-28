const mapContainer = document.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const createFeatures = (adElement, ad) => {
  const featureContainer = adElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
};

const createPhotos = (adElement, ad) => {
  const photoContainer = adElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  const fragment = document.createDocumentFragment();

  if (ad.offer.photos.length === 0) {
    photoContainer.innerHTML = '';
  } else {
    ad.offer.photos.forEach((offerPhoto) => {
      photoContainer.innerHTML = '';
      const photo = photoTemplate.cloneNode(true);

      photo.src = `${offerPhoto}`;
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

  return adElement;
};

const renderAds = (ads) => {
  const array = [];

  ads.forEach((ad) => {
    const adElement = createAdElement(ad);
    array.push(adElement);
  });
  mapContainer.appendChild(array[0]);
};

export { renderAds };


