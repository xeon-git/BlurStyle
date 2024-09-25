import {saveToLocalStorage, getFromLocalStorage} from '../utils/storage';
import {chatActive} from '../utils/state';
import {checkChatState} from '../utils/checkChatState';

let filters = false;
const saturationValue = 170;
const contrastValue = 110;

export const restoreFilterSettings = () => {filters = getFromLocalStorage('filters', filters); updateFilters();};

export const initializeFilters = () => {document.addEventListener('keydown', (event) => {
  const currentURL = window.location.href;
  const allowedURLs = ['https://tankionline.com/play', 'https://tankionline.com/play/*', 'https://*.test-eu.tankionline.com/browser-public/index.html?*'];

  const isValidURL = allowedURLs.some((url) => new RegExp(url.replace(/\*/g, '.*')).test(currentURL)); checkChatState();
    if (!chatActive && event.key === '\\' && isValidURL) {toggleFilters();}});};

const applyFilters = () => {document.body.style.filter = `saturate(${saturationValue}%) contrast(${contrastValue}%)`;};

const resetFilters = () => {document.body.style.filter = '';};

const updateFilters = () => {
  const currentURL = window.location.href;
  const targetURLs = ['https://tankionline.com/play', 'https://tankionline.com/play/*','https://*.test-eu.tankionline.com/browser-public/index.html?*'];

  const isMatchingURL = targetURLs.some((targetURL) => {
    const regex = new RegExp(targetURL.replace(/\*/g, '.*'));
      return regex.test(currentURL);});

  if (filters && isMatchingURL) {applyFilters();}
    else {resetFilters();}};

const toggleFilters = () => {filters = !filters; updateFilters(); saveToLocalStorage('filters', filters);};