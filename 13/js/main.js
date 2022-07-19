import {createPublication} from './data.js';
import {renderMiniatures} from './miniatures.js';
import './form.js';
import {initEffects} from './filters.js';

const publicationData = Array.from({ length: 6 }, createPublication);
renderMiniatures();
initEffects();

export {publicationData};
