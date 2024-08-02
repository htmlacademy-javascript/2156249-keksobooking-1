import { isEscapeKey } from './util.js';

const body = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');


body.appendChild(successMessageElement);
successMessageElement.classList.add('hidden');

body.appendChild(errorMessageElement);
errorMessageElement.classList.add('hidden');

// Сообщение об успехе

const hideSuccessMessage = () => {
  successMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  body.removeEventListener('click', hideSuccessMessage);
};

function onDocumentKeydownSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
}

const showSuccessMessage = () => {
  successMessageElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  body.addEventListener('click', hideSuccessMessage);
};

// Сообщение о неудаче

const hideErrorMessage = () => {
  errorMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownError);
  body.removeEventListener('click', hideErrorMessage);
  errorButtonElement.removeEventListener('click', hideErrorMessage);
};

function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorMessage();
  }
}

const showErrorMessage = () => {
  errorMessageElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownError);
  body.addEventListener('click', hideErrorMessage);
  errorButtonElement.addEventListener('click', hideErrorMessage);
};

export { showSuccessMessage, showErrorMessage };


