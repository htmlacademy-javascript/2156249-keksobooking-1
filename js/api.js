const BASE_URL = 'https://28.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
};

//Общая функция

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

// Получение данных

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);


// Отправка данных

const sendData = (body) => load(Route.SEND_DATA, ErrorText.GET_DATA, Method.POST, body);

// ?? ЧТО ДЕЛАТЬ С ERRORTEXT????

export { getData, sendData };
