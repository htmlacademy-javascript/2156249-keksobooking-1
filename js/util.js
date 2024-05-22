//Случайное целое число из указанного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Случайное целое число без диапазона
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

//Случайное целое число из диапазона с плавающей точкой для координат
const getRandomCoordinate = (a, b, decimalPlaces) => {

  if (a < 0 || b < 0) {
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

export {getRandomInteger, getRandomInfiniteNumber, getRandomCoordinate, createAvatarNumbers};
