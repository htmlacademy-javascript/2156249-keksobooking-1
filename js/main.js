// Входные данные
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
const lat = {
  min: 35.65000,
  max: 35.70000,
};
const lng = {
  min: 139.70000,
  max: 139.80000,
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

//Базовые функции
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomInfiniteNumber = () => {
  const numReserve = [];
  let randomNumber;
  while (numReserve.length < 12) {
    randomNumber = Math.ceil(Math.random() * 1000);
    let found = false;
    for (let i = 0; i < numReserve.length; i++) {
      if (numReserve[i] === randomNumber) {
        found = true;
        break;
      }
    }
    if (!found) {
      numReserve[numReserve.length] = randomNumber;
    }
  }
  return randomNumber;
};
const getRandomNumber = (a, b, decimalPlaces) => {

  if (a < 0 || b < 0) {
    return NaN
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(decimalPlaces);
};

//Создаем автора
const createAvatarNumbers = (start, end) => {
  const numbers = [];

  for (i = start; i <= end; i++) {
    numbers.push(String(i))
  }

  const result = [];
  numbers.forEach((number) => {
    if (Number(number) < 10) {
      result.push('0' + number);
    } else {
      result.push(number);
    }
  });

  return result;
};
const createAuthor = () => {
  const avatarNumbers = createAvatarNumbers(1, 10);
  const randomAvatarIndex = getRandomInteger(0, avatarNumbers.length - 1)

  return {
    avatar: 'img/avatars/user' + avatarNumbers[randomAvatarIndex] + '.png',
  }
};

//Создаем предложение

// Создаем адрес
const createAdress = () => {
  return {
    lat: getRandomNumber(lat.min, lat.max, 5) + '',
    lng: getRandomNumber(lng.min, lng.max, 5) + '',
  };
};

//Создаем набор удобств
const createActualFeatures = (features) => {
  const actualFeatures = [];
  const start = getRandomInteger(1, features.length - 1);
  const amount = getRandomInteger(1, features.length - 1);

  if (start < amount) {
    for (let i = start; i <= amount; i++) {
      actualFeatures.push(features[i]);
    }
    return actualFeatures
  }
  return features
};

//Создаем фото
const createPhotos = (photos) => {
  const actualPhotos = [];
  const start = getRandomInteger(1, photos.length - 1);
  const amount = getRandomInteger(1, photos.length - 1);

  if (start < amount) {
    for (let i = start; i <= amount; i++) {
      actualPhotos.push(photos[i]);
    }
    return actualPhotos
  }
  return photos
};

//Само предложение
const createOffer = () => {
  const randomTitleIndex = getRandomInteger(0, TITLES.length - 1);
  const randomTypeIndex = getRandomInteger(0, TYPES.length - 1);
  const randomCheckinIndex = getRandomInteger(0, CHECKINS.length - 1);
  const randomCheckoutIndex = getRandomInteger(0, CHECKOUTS.length - 1);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return {
    title: TITLES[randomTitleIndex] + '',
    adress: createAdress(),
    type: TYPES[randomTypeIndex] + '',
    price: getRandomInfiniteNumber(),
    rooms: getRandomInteger(1, 7),
    guests: getRandomInteger(1, 10),
    checkin: CHECKINS[randomCheckinIndex] + '',
    checkout: CHECKOUTS[randomCheckoutIndex] + '',
    features: createActualFeatures(FEATURES),
    description: DESCRIPTIONS[randomDescriptionIndex] + '',
    photos: createPhotos(PHOTOS),
  }
}

//Создаем локацию
const createLocation = () => {
  return {
    lat: getRandomNumber(lat.min, lat.max, 5),
    lng: getRandomNumber(lng.min, lng.max, 5),
  };
};

//Создаем целое объявление
const createAnnouncement = () => {
  return {
    author: createAuthor(),
    offer: createOffer(),
    location: createLocation(),
  }
};

//Создаем 10 объявлений
const similarAnnouncements = Array.from({length: 10}, createAnnouncement);

similarAnnouncements;



