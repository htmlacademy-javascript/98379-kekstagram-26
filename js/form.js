import { isEscPressed } from './util.js';


const MAX_STRING_LENGTH = 140;
const HASHTAGS_QUANTITY = 5;

const body = document.querySelector('body');
const uploadFileField = document.querySelector('#upload-file');
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const btnCancel = imgUpload.querySelector('.img-upload__cancel');
// const btnSubmit = imgUpload.querySelector('.img-upload__submit');


const hashtagField = imgUpload.querySelector('.text__hashtags');
const commentField = imgUpload.querySelector('.text__description');
const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Реализуем открытие и закрытие формы

const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
};

const onPopupCloseButtonClick = () => {
  closeUploadPopup();
};

uploadFileField.addEventListener('change', () => {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  btnCancel.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
});

function closeUploadPopup () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);
}


// Валидация

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const checkCommentsLength = (value) => value.length <= MAX_STRING_LENGTH;

const getHashtags = (string) => string.split(' ').filter((item) => item !== '');
// разделяем строку на массив значений, затем проверяем на пустую строку

const getUniqueHashtags = (string) => {
  const hashtags = getHashtags(string);
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const checkQuantity = (string) => {
  const hashtags = getHashtags(string);
  if (hashtags.length <= HASHTAGS_QUANTITY) {
    return true;
  } else if (hashtags.length > HASHTAGS_QUANTITY) {
    return false;
  }
};

const getHashtagsToLowerCase = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.map((element) => element.toLowerCase());
};


const checkHashtagsSymbols = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.every((element) => hashtagRegex.test(element));
};


pristine.addValidator(commentField, checkCommentsLength, `Не более ${MAX_STRING_LENGTH} символов`);
pristine.addValidator(hashtagField, getUniqueHashtags, 'Хэштеги не могут повторяться');
pristine.addValidator(hashtagField, checkQuantity, 'Не более 5 хэштегов');
pristine.addValidator(hashtagField, getHashtagsToLowerCase, '');
pristine.addValidator(hashtagField, checkHashtagsSymbols, 'Хэштег начинается c #, содержит только буквы и цифры, не более 20 символов');


// отменяем ESC при фокусе на полях ввода
hashtagField.addEventListener('keydown', (evt) => {
  if (isEscPressed(evt)) {
    evt.stopPropagation();
  }
});

commentField.addEventListener('keydown', (evt) => {
  if (isEscPressed(evt)) {
    evt.stopPropagation();
  }
});
