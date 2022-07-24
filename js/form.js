import {isEscPressed} from './util.js';
import {onFilterButtonChange, effectList, sliderWrapper, imgPreview} from './filters.js';
import {addScalingEventListeners, removeScalingEventListeners} from './scale-control.js';
import {sendData} from './api.js';
import {showMessageSuccess, showMessageError} from './messages.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'heic'];
const MAX_STRING_LENGTH = 140;
const HASHTAGS_QUANTITY = 5;

const body = document.querySelector('body');
const uploadFileField = document.querySelector('#upload-file');
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const btnCancel = imgUpload.querySelector('.img-upload__cancel');

const btnSubmit = imgUpload.querySelector('.img-upload__submit');

const hashtagField = imgUpload.querySelector('.text__hashtags');
const commentField = imgUpload.querySelector('.text__description');
const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const fileChooser = document.querySelector('.img-upload__input');

const uploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};


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

const onFocusBlurEscKeydown = () => {
  commentField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  commentField.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
  hashtagField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  hashtagField.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

function showUploadPopup (evt) {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  btnCancel.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown',onPopupEscKeydown);
  onFocusBlurEscKeydown();
  sliderWrapper.classList.add('hidden');
  addScalingEventListeners();
  effectList.addEventListener('change', onFilterButtonChange);
  uploadImage(evt);
}

function closeUploadPopup () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);

  removeScalingEventListeners();

  effectList.removeEventListener('change', onFilterButtonChange);
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');

  imgUploadForm.reset();
}


const blockSubmitButton = () => {
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  btnSubmit.disabled = false;
  btnSubmit.textContent = 'Опубликовать';
};


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


const submitForm = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showMessageSuccess();
          closeUploadPopup();
        },
        () => {
          unblockSubmitButton();
          showMessageError();
          closeUploadPopup();
        },
        new FormData(evt.target),
      );
    }
  });
};

uploadFileField.addEventListener('change', showUploadPopup);

export {closeUploadPopup, submitForm, showUploadPopup};
