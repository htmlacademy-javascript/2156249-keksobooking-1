//Случайное целое число из указанного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Случайное целое число из диапазона с плавающей точкой для координат
const getRandomCoordinate = (a, b, decimalPlaces) => {
  if (a < 0 || b < 0 || decimalPlaces < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(decimalPlaces);
};

//Массив из чисел определенной длинны для нумерации автора
const createAvatarNumbers = (start, end) => {
  const numbers = [];

  for (let i = start; i <= end; i++) {
    numbers.push(String(i));
  }

  const result = [];
  numbers.forEach((number) => {
    if (Number(number) < 10) {
      result.push(`0${number}`);
    } else {
      result.push(number);
    }
  });

  return result;
};

// Случайное число для перемешивания массивов с удобствами и фото
const getRandomElements = () => Math.random() - 0.5;

//Создаем случайный элемент для предложения
const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

//Задаем элементам значение disabled
const setDisabledState = (elements, isDisabled) => {
  elements.forEach((element) => {
    element.disabled = isDisabled;
  });
};

//Заполняем элемент шаблона нужным содержанием
const fillElementAtribute = (element, attribut, property, value) => {
  if (!value) {
    element.querySelector(`${attribut}`).remove();
  } else {
    element.querySelector(`${attribut}`)[property] = value;
  }
};

//Округляем значения координат
const roundCoordinates = (coordinate, decimals) => Number(coordinate.toFixed(decimals));

export {
  getRandomInteger, getRandomCoordinate, createAvatarNumbers, getRandomElements,
  getRandomArrayElement, setDisabledState, fillElementAtribute, roundCoordinates
};
