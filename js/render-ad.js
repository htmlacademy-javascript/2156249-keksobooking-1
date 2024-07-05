import { fillElementAtribute } from './util.js';

const typeMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const mapContainer = document.querySelector('.map__canvas');

const createFeatures = (adElement, features) => {
  const featureContainer = adElement.querySelector('.popup__features');
  const fragment = document.createDocumentFragment();

  if (!features || features.length === 0) {
    featureContainer.remove();
  } else {
    featureContainer.innerHTML = '';
    features.forEach((offerFeature) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(`popup__feature--${offerFeature}`);
      fragment.appendChild(feature);
    });
  }
  featureContainer.appendChild(fragment);
};

const createPhotos = (adElement, photos) => {
  const photoContainer = adElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  const fragment = document.createDocumentFragment();

  if (!photos || photos.length === 0) {
    photoContainer.remove();
  } else {
    photos.forEach((offerPhoto) => {
      photoContainer.innerHTML = '';
      const photo = photoTemplate.cloneNode(true);

      photo.src = offerPhoto;
      fragment.appendChild(photo);
    });
    photoContainer.appendChild(fragment);
  }
};

const getRoomPlural = (rooms) => {
  const oneRoom = 'комната';
  const twoFourRooms = 'комнаты';
  const severalRooms = 'комнат';
  if (rooms === 1) {
    return oneRoom;
  } else if (rooms === 2 || rooms === 3 || rooms === 4) {
    return twoFourRooms;
  } else {
    return severalRooms;
  }
};

const getGuestPlural = (guests) => {
  const oneGuest = 'гостя';
  const severalGuests = 'гостей';
  if (guests === 1) {
    return oneGuest;
  } else {
    return severalGuests;
  }
};

const getCapacity = (rooms, guests) => rooms && guests ? `${rooms} ${getRoomPlural(rooms)}  для ${guests} ${getGuestPlural(guests)}` : null;

const getTime = (checkin, checkout) => checkin && checkout ? `Заезд после ${checkin}, выезд до ${checkout}` : null;

const createAdElement = (ad, template) => {
  const element = template.cloneNode(true);

  fillElementAtribute(element, '.popup__title', 'textContent', ad.offer.title);
  fillElementAtribute(element, '.popup__text--address', 'textContent', ad.offer.address);
  fillElementAtribute(element, '.popup__text--price', 'textContent', `${ad.offer.price} ₽/ночь`);
  fillElementAtribute(element, '.popup__type', 'textContent', typeMap[ad.offer.type]);
  fillElementAtribute(element, '.popup__text--capacity', 'textContent', getCapacity(ad.offer.rooms, ad.offer.guests));
  fillElementAtribute(element, '.popup__text--time', 'textContent', getTime(ad.offer.checkin, ad.offer.checkout));
  fillElementAtribute(element, '.popup__description', 'textContent', ad.offer.description);
  fillElementAtribute(element, '.popup__avatar', 'src', ad.author.avatar);

  createFeatures(element, ad.offer.features);
  createPhotos(element, ad.offer.photos);

  return element;
};

const renderAd = (ad) => {
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = createAdElement(ad, similarAdTemplate);
  mapContainer.appendChild(adElement);
};

export { renderAd, createAdElement };
