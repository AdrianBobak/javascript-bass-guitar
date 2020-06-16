import JSGuitar from './JSGuitar/index.js';
import StringsColouring from './stringsColouring/index.js';
import Modal from './modal/index.js';

new JSGuitar(document.querySelector('.guitar'));
new StringsColouring(document.querySelector('.guitar'));
new Modal(document.querySelector('.modal'));
