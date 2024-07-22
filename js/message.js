import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');

// Сообщение об успехе

const hideSuccessMessage = () => {
  successMessageElement.classList.add('hidden');
};

const onDocumentKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessageElement);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.body.addEventListener('click', () => {
    hideSuccessMessage();
  });
};

// Сообщение о неудаче

const hideErrorMessage = () => {
  errorMessageElement.classList.add('hidden');
};

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorMessage();
  }
};

const showErrorMessage = () => {
  document.body.append(errorMessageElement);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.body.addEventListener('click', () => {
    hideErrorMessage();
  });
};

errorButtonElement.addEventListener('click', () => {
  hideErrorMessage();
});

export { showSuccessMessage, showErrorMessage };


