const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const IMG_WIDTH = 300;
const IMG_HEIGHT = 180;

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

const adPhotoChooserElement = document.querySelector('#images');
const adPhotoPreviewElement = document.querySelector('.ad-form__photo');

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

adPhotoChooserElement.addEventListener('change', () => {
  const file = adPhotoChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const image = document.createElement('img');
    image.width = IMG_WIDTH;
    image.height = IMG_HEIGHT;
    image.alt = 'Фото жилья';
    image.src = URL.createObjectURL(file);
    adPhotoPreviewElement.appendChild(image);
  }
});
