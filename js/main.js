import {renderUserPhotos} from './miniatures.js';
import {closeUploadPopup} from './form.js';
import {submitForm} from './form.js';
import {initEffects} from './filters.js';
import {showFilteredPictures} from './sort.js';
import {getData} from './api.js';


getData((pictures) => {
  renderUserPhotos(pictures);
  showFilteredPictures(pictures);
});

submitForm(closeUploadPopup);
initEffects();

