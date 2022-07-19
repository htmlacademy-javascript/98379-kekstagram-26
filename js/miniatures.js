import {publicationData} from './main.js';
import {renderPopupComments} from './popup.js';


const pictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const template = templatePicture.querySelector('a');
const fragment = document.createDocumentFragment();

const bigPicture = document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');


function renderMiniatures() {
  publicationData.forEach((publication) => {
    const miniature = template.cloneNode(true);
    miniature.querySelector('img').src = publication.url;
    miniature.querySelector('.picture__likes').textContent = publication.likes;
    miniature.querySelector('.picture__comments').textContent = publication.comments.length;
    fragment.appendChild(miniature);
    miniature.addEventListener('click', function() {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = this.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = this.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = this.querySelector('.picture__comments').textContent;

      const commentsObj = publication.comments;
      const descObj = publication.description;
      renderPopupComments(bigPictureComments, commentsObj, commentsObj.length);

      bigPicture.querySelector('.social__caption').textContent = descObj;


      document.querySelector('body').classList.add('modal-open');
    });
  });

  pictures.appendChild(fragment);
}

export {renderMiniatures};
