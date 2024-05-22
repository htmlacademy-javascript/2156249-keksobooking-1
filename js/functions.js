const getRandomNumber = (a, b, decimalPlaces) => {

  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(decimalPlaces);
};

getRandomNumber(1, 1, 10);
