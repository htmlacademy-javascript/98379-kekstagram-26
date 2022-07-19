const isEscPressed = (evt) => evt.key === 'Escape';

const checkStringLength = function(string, maxLength) {
  return string.length <= maxLength;
};

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}


export {isEscPressed, getRandomPositiveInteger, checkStringLength};
