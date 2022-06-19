const MAX_STRING_LENGTH = 140;

function getRandomNum(minNum, maxNum) {
  if (maxNum <= minNum) {
    return alert('Второе число должно быть больше первого');
  }
  if (minNum >= 0) {
    return Math.floor(Math.random() * (maxNum - minNum) + minNum);
  } else {
    return alert('Число должно быть больше нуля, либо равно ему');
  }
}

const checkStringLength = function(string, maxLength) {
  return string.length < maxLength;
};

getRandomNum(12, 123);
checkStringLength('sdcsa', MAX_STRING_LENGTH);
