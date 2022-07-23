const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
let currentValue;

const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');

const imgPreview = imgUploadOverlay.querySelector('.img-upload__preview img');

const scale = () => {
  scaleControlValue.value = `${currentValue}%`;
  imgPreview.style.transform = `scale(${currentValue / 100})`;
};

const zoomOut = () => {
  if (currentValue > MIN_VALUE) {
    currentValue -= STEP_VALUE;
  }
  scale();
};

const zoomIn = () => {
  if (currentValue < MAX_VALUE) {
    currentValue += STEP_VALUE;
  }
  scale();
};

const addScalingEventListeners = () => {
  currentValue = MAX_VALUE;
  scaleControlValue.value = `${MAX_VALUE}%`;
  imgPreview.style.transform = `scale(${1})`;
  scaleControlSmaller.addEventListener('click', zoomOut);
  scaleControlBigger.addEventListener('click', zoomIn);
};

const removeScalingEventListeners = () => {
  scaleControlSmaller.removeEventListener('click', zoomOut);
  scaleControlBigger.removeEventListener('click', zoomIn);
};

export {addScalingEventListeners, removeScalingEventListeners};
