// const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const ALERT_SHOW_TIME = 5000;

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

//Сообщаем об ошибке при ОТПРАВКЕ данных

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {
  setDisabledState, fillElementAtribute, roundCoordinates,
  showAlert
};
