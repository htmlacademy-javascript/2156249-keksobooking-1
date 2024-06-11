import { getRandomInteger, getRandomCoordinate, createAvatarNumbers, getRandomElements, getRandomArrayElement } from './util.js';

// Входные данные
const SIMILAR_ADVERTISEMENT_COUNT = 10;

const TITLES = [
  'Прекрасное предложение',
  'Великолепная цена',
  'Отличная локация',
  'Незабываемый вид',
  'Место мечты',
  'Райское наслаждение',
  'Если отдыхать, то только так',
  'Супер вариант',
  'Идеальный отдых',
  'Выберайте нас!',
];
const Lat = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const Lng = {
  MIN: 139.70000,
  MAX: 139.80000,
};
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'У нас уйютно',
  'Есть кухонька',
  'Можно с хвостиками',
  'Два шикарных этажа',
  'Матрас ортопедический',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Создаем автора
const createAuthor = () => {
  const avatarNumbers = createAvatarNumbers(1, 10);
  const randomAvatarIndex = getRandomInteger(0, avatarNumbers.length - 1);

  return {
    avatar: `img/avatars/user${avatarNumbers[randomAvatarIndex]}.png`,
  };
};

//Создаем локацию
const createLocation = () => ({
  lat: getRandomCoordinate(Lat.MIN, Lat.MAX, 5),
  lng: getRandomCoordinate(Lng.MIN, Lng.MAX, 5),
});

//Создаем адрес
const createAddress = (loc) => `${loc.lat}, ${loc.lng}.`;

//Перемешиваем массив для набора удобств и фото
const getShuffledArray = (items) => {
  const shuffledElements = items.sort(getRandomElements);
  const elementsCount = getRandomInteger(0, items.length);
  return shuffledElements.slice(0, elementsCount);
};

//Создаем предложение
const createOffer = (location) => ({
  title: getRandomArrayElement(TITLES),
  address: createAddress(location),
  type: getRandomArrayElement(TYPES),
  price: getRandomInteger(1000, 100000),
  rooms: getRandomInteger(1, 7),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(CHECKINS),
  checkout: getRandomArrayElement(CHECKOUTS),
  features: getShuffledArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getShuffledArray(PHOTOS),
});

//Создаем целое объявление
const createAd = () => {
  const location = createLocation();

  return {
    author: createAuthor(),
    offer: createOffer(location),
    location: location,
  };
};

//Создаем 10 объявлений
const createSimilarAds = () => Array.from({ length: SIMILAR_ADVERTISEMENT_COUNT }, createAd);
export { createSimilarAds };

