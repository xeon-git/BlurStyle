import {saveToLocalStorage, getFromLocalStorage} from './storage';
import {chatActive} from './state';
import {checkChatState} from './checkChatState';

let filters = false;
let saturationValue = 170;
let contrastValue = 110;
let filtersInitialized = false;
const allowedURLs = ['https://tankionline.com/play', 'https://tankionline.com/play/*', 'https://*.test-eu.tankionline.com/browser-public/index.html?*'];

export const initFilters = () => {filters = getFromLocalStorage('filters', false); saturationValue = getFromLocalStorage('saturationValue', 170); contrastValue = getFromLocalStorage('contrastValue', 110); bindHotkey(); updateFilters(); filtersInitialized = true;};
export const bindHotkey = () => {
  document.addEventListener('keydown', (event) => {
    const hotkey = getFromLocalStorage('hotkey_toggleFilters', 'Backslash');
    const hotkeysEnabled = getFromLocalStorage('hotkeysEnabled', true);
    const currentURL = window.location.href;
    const isValidURL = allowedURLs.some((url) => new RegExp(url.replace(/\*/g, '.*')).test(currentURL)); checkChatState();
      if (!chatActive && event.code === hotkey && isValidURL && hotkeysEnabled) {toggleFilters();}});};

export const applyFilters = () => {document.body.style.filter = `saturate(${saturationValue}%) contrast(${contrastValue}%)`;};
export const resetFilters = () => {document.body.style.filter = '';};
export const updateFilters = () => {
  const currentURL = window.location.href;
  const isMatchingURL = allowedURLs.some((targetURL) => {
    const regex = new RegExp(targetURL.replace(/\*/g, '.*'));
      return regex.test(currentURL);});
        if (filters && isMatchingURL) {applyFilters();}
          else {resetFilters();}};

export const toggleFilters = () => {filters = !filters; updateFilters(); saveToLocalStorage('filters', filters);
  document.dispatchEvent(new CustomEvent('bs-settings-change', {detail: {key: 'filters', value: filters}}));
    return filters;};

export const setFilterValues = (saturation, contrast) => {saturationValue = saturation; contrastValue = contrast; saveToLocalStorage('saturationValue', saturation); saveToLocalStorage('contrastValue', contrast);
  if (filters) {applyFilters();}};

export const restoreFilterSettings = () => {
  if (!filtersInitialized) {initFilters();}};

export const initializeFilters = () => {
  if (!filtersInitialized) {initFilters();}
};