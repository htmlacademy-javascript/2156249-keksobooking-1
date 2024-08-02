const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

const adPhotoContainer = document.querySelector('.ad-form__photo-container');
const adPhotoChooserElement = document.querySelector('#images');
const adPhotoPreviewTemplate = document.querySelector('#upload').content.querySelector('.ad-form__photo');

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
    const adPhotoPreviewElement = adPhotoPreviewTemplate.cloneNode(true);
    const image = adPhotoPreviewElement.querySelector('img');
    image.src = URL.createObjectURL(file);

    adPhotoContainer.appendChild(adPhotoPreviewElement);
  }
});
