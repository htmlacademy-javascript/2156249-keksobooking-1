//вариант 1 - НЕ понимаю ПОБИТОВОЕ ИЛИ :((

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const createActualFeatures = (features) => {
  const amount = getRandomInteger(1, features.length);
  const actualFeatures = features.slice();

  for (let i = actualFeatures.length; i > 0; i--) {
    const j = Math.random() * (i + 1) | 0;
    [actualFeatures[j], actualFeatures[i]] = [actualFeatures[i], actualFeatures[j]];
  }

  return actualFeatures.slice(0, 1 + Math.random() * amount | 0);
};

createActualFeatures(FEATURES);
