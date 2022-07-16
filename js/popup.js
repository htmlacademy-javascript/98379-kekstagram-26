import { isEscPressed } from './util.js';

const MAX_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');
// const commentsLoader = bigPicture.querySelector('.comments-loader');
// const commentsContainer = bigPicture.querySelector('.social__comments');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');


let htmlCommentElements = bigPicture.querySelectorAll('.social__comment');

function renderPopupComments(htmlArray, dataArray, count) {
// удаляем содержимое контейнера с комментариями
  while (htmlArray.firstChild) {
    htmlArray.firstChild.remove();
  }
  // прячем или показываем кнопку Загрузить ещё
  if(count <= MAX_COMMENTS_TO_SHOW) {
    loadCommentsButton.classList.add('hidden');
  }
  else {
    loadCommentsButton.classList.remove('hidden');
  }
  // создаём и добавляем разметку комментариев в родительский блок
  for (let i = 0; i < dataArray.length; i++) {
    const dataComment = dataArray[i];
    const newCommentItem = document.createElement('li');
    newCommentItem.classList.add('social__comment');
    const commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = dataComment.avatar;
    commentImage.alt = dataComment.name;
    commentImage.width = 35;
    commentImage.height = 35;
    newCommentItem.appendChild(commentImage);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = dataComment.message;
    newCommentItem.appendChild(commentText);

    htmlArray.appendChild(newCommentItem);
  }
  // напитываем комментарии данными отыскивая созданную в прошлом цикле вёрстку
  for (let i = 0; i < count; i++) {
    const dataComment = dataArray[i];
    htmlCommentElements = bigPicture.querySelectorAll('.social__comment');
    htmlCommentElements[i].querySelector('img').src = dataComment[1].avatar;
    htmlCommentElements[i].querySelector('p').textContent = dataComment[2].message;
    htmlCommentElements[i].querySelector('img').alt = dataComment[3].name;
  }


  // htmlCommentElements = Object.entries(htmlCommentElements);
  // htmlCommentElements.slice(1, 2);
  // commentsContainer.appendChild(htmlCommentElements);


}


bigPictureCancelBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscPressed(evt)) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export { renderPopupComments };
