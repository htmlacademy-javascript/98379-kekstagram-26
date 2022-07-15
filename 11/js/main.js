import { createPublication } from './data.js';
import { renderMiniatures } from './miniatures.js';
import './form.js';

const publicationData = Array.from({ length: 6 }, createPublication);
renderMiniatures();

export { publicationData };
