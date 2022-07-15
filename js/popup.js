import {isEscPressed} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancelBtn = document.querySelector('.big-picture__cancel');

function renderPopupComments(htmlArray, dataArray, count) {
  for (let i = 0; i < count; i++) {
    const dataComment = dataArray[i];
    htmlArray[i].querySelector('img').src = dataComment[1].avatar;
    htmlArray[i].querySelector('p').textContent = dataComment[2].message;
    htmlArray[i].querySelector('img').alt = dataComment[3].name;
  }
}

bigPictureCancelBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscPressed(evt)) {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});

export { renderPopupComments };
