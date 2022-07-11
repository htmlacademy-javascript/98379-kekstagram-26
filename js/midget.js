import { createPublication } from './data.js';

// ПЕРВЫЙ БЛОК 7 ЗАДАНИЯ

const pictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const template = templatePicture.querySelector('a');
const arrayPicture = Array.from({ length: 6 }, createPublication);
const fragment = document.createDocumentFragment();


for (let i = 0; i < arrayPicture.length; i++) {
  const element = template.cloneNode(true);
  element.querySelector('img').src = arrayPicture[i].url;
  element.querySelector('.picture__likes').textContent = arrayPicture[i].likes;
  element.querySelector('.picture__comments').textContent = arrayPicture[i].comments.length;
  fragment.appendChild(element);
}

pictures.appendChild(fragment);


// ВТОРОЙ БЛОК 7 ЗАДАНИЯ

const smallPicture = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancelBtn = document.querySelector('.big-picture__cancel');

// 2.Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии
// Для решения данной задачи и последней(связки миниатюры и полноразмерного формата) создаётся цикл, где "в лоб" массивы обмениваются данными

for (let i = 0; i < smallPicture.length; i++) {
  smallPicture[i].addEventListener('click', function() {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = this.querySelector('.picture__img').src;
    bigPicture.querySelector('.likes-count').textContent = this.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = this.querySelector('.picture__comments').textContent;
    const commentsObj = arrayPicture[i].comments;
    const descObj = arrayPicture[i].description;
    const comment1 = commentsObj[0];
    const comment2 = commentsObj[1];

    const bigPictureComments = bigPicture.querySelectorAll('.social__comment');
    bigPictureComments[0].getElementsByTagName('img')[0].src = comment1[1].avatar;
    bigPictureComments[0].getElementsByTagName('p')[0].textContent = comment1[2].message;
    bigPictureComments[0].getElementsByTagName('img')[0].alt = comment1[3].name;

    bigPictureComments[1].getElementsByTagName('img')[0].src = comment2[1].avatar;
    bigPictureComments[1].getElementsByTagName('p')[0].textContent = comment2[2].message;
    bigPictureComments[1].getElementsByTagName('img')[0].alt = comment2[3].name;

    bigPicture.querySelector('.social__caption').textContent = descObj;

    // 3. После открытия окна спрячьте блоки счётчика комментариев .social__comment-count
    // и загрузки новых комментариев .comments-loader, добавив им класс hidden
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    // 4. После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями
    // позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
    document.querySelector('body').classList.add('modal-open');

  });
}

// 5. Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

bigPictureCancelBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});
