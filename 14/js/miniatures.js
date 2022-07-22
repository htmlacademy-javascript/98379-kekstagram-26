import {showBigPicture} from './popup.js';


const container = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const template = templatePicture.querySelector('a');
const fragment = document.createDocumentFragment();

// один объект
function renderMiniatures(picture) {
  const miniature = template.cloneNode(true);
  miniature.querySelector('img').src = picture.url;
  miniature.querySelector('.picture__likes').textContent = picture.likes;
  miniature.querySelector('.picture__comments').textContent = picture.comments.length;

  miniature.addEventListener('click', () => {
    showBigPicture(picture);
  });

  fragment.appendChild(miniature);
}
// все 25
const renderUserPhotos = (pictures) => {
  pictures.forEach((picture) => {
    renderMiniatures(picture);
  });
  return container.appendChild(fragment);
};

export {renderUserPhotos};
