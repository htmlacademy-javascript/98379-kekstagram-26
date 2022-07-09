import { createPublication } from './data.js';

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

// const bigPictureCancelBtn = document.querySelector('.big-picture__cancel');


for (let i = 0; i < smallPicture.length; i++) {
  smallPicture[i].addEventListener('click', function() {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = this.querySelector('.picture__img').src;
    bigPicture.querySelector('.likes-count').textContent = this.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = this.querySelector('.picture__comments').textContent;

    bigPicture.querySelector('.social__text').textContent = arrayPicture[i].message;
  });
}

// bigPictureCancelBtn.addEventListener('click', function() {
//   bigPicture.classList.add('hidden');
// });
