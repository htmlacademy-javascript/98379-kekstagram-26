import {createPublication} from './data.js';

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
