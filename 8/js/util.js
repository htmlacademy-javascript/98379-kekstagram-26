import {MAX_STRING_LENGTH, PHOTO_DESC, COMMENT_MESS, COMMENT_NAME, createPublicationIdArray, createPublicationUrlArray, createPublicationCommentIdArray} from './data.js';

// Самописная ф-я из 1 задания
// function getRandomNum(minNum, maxNum) {
//   if (maxNum <= minNum) {
//     //return alert('Второе число должно быть больше первого');
//   }
//   if (minNum >= 0) {
//     return Math.floor(Math.random() * (maxNum - minNum) + minNum);
//   } else {
//     //return alert('Число должно быть больше нуля, либо равно ему');
//   }
// }


function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const checkStringLength = function(string, maxLength) {
  return string.length <= maxLength;
};

getRandomPositiveInteger(12, 123);
checkStringLength('sdcsa', MAX_STRING_LENGTH);


function getRandomPositiveIntegerForPublication(a, b, array) {
  let result;
  do { result = getRandomPositiveInteger(a, b); }
  while (array.includes(result));

  array.push(result);
  return result;
}

const createPublication = () => ({

  id: getRandomPositiveIntegerForPublication(1, 25, createPublicationIdArray),
  url: `photos/${getRandomPositiveIntegerForPublication(1, 25, createPublicationUrlArray)}.jpg`,
  description: PHOTO_DESC[getRandomPositiveInteger(0, PHOTO_DESC.length - 1)],
  likes: getRandomPositiveInteger(15, 200),

  comments: [
    { id: getRandomPositiveIntegerForPublication(0, 10000, createPublicationCommentIdArray) },
    { avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg` },
    { message: COMMENT_MESS[getRandomPositiveInteger(0, COMMENT_MESS.length - 1)] },
    { name: COMMENT_NAME[getRandomPositiveInteger(0, COMMENT_NAME.length - 1)] }
  ]


});

Array.from({ length: 25 }, createPublication);

export {getRandomPositiveInteger, checkStringLength, getRandomPositiveIntegerForPublication, createPublication};
