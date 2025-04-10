import {createCard, createToggle, createSlider, createNumberInput, showNotification} from '../utils';
import {getFromLocalStorage, saveToLocalStorage} from '../../utils/storage';

export const createUtilsSection = (container) => {
  const filtersCard = createCard('Настройки фильтров');
  const filtersEnabled = getFromLocalStorage('filters', false);
  const saturationValue = getFromLocalStorage('saturationValue', 170);
  const contrastValue = getFromLocalStorage('contrastValue', 110);
  const filtersToggle = createToggle('Фильтры', filtersEnabled, (value) => {saveToLocalStorage('filters', value); value ? document.body.style.filter = `saturate(${saturationValue}%) contrast(${contrastValue}%)` : document.body.style.filter = '';
    showNotification(`Фильтры ${value ? 'вкл' : 'выкл'}`, 'success');}, 'filters'); filtersCard.appendChild(filtersToggle);
  
  const saturationSlider = createSlider('Насыщенность', saturationValue, 0, 300, (value) => {saveToLocalStorage('saturationValue', value); filtersEnabled && (document.body.style.filter = `saturate(${value}%) contrast(${contrastValue}%)`);}); filtersCard.appendChild(saturationSlider);
  const contrastSlider = createSlider('Контраст', contrastValue, 0, 200, (value) => {saveToLocalStorage('contrastValue', value); filtersEnabled && (document.body.style.filter = `saturate(${saturationValue}%) contrast(${value}%)`);}); filtersCard.appendChild(contrastSlider);
  const animationsCard = createCard('Настройки анимаций');
  const animationsEnabled = getFromLocalStorage('animationsEnabled', true);
  const animationsToggle = createToggle('Глобальные анимации', animationsEnabled, (value) => {saveToLocalStorage('animationsEnabled', value);
    const styleElement = document.querySelector('style[data-bs-animations-disabled]');
      if (!value && !styleElement) {
        const noAnimationsStyle = document.createElement('style'); noAnimationsStyle.dataset.bsAnimationsDisabled = 'true'; noAnimationsStyle.textContent = `* {animation: none !important; transition: none !important;}`;
          document.head.appendChild(noAnimationsStyle); showNotification('Глобальные анимации отключены', 'success');}
            else if (value && styleElement) {styleElement.remove(); showNotification('Глобальные анимации включены', 'success');}}, 'animationsEnabled'); animationsCard.appendChild(animationsToggle);
  
  const loadingBgCard = createCard('Анимированный фон загрузки');
  const spaceAnim = getFromLocalStorage('spaceAnim', true);
  const spaceAnimToggle = createToggle('Анимация с космосом', spaceAnim, (value) => {
    if (window.toggleStarAnimation) {window.toggleStarAnimation();}
      else {saveToLocalStorage('spaceAnim', value);} showNotification(`Анимация с космосом ${value ? 'включена' : 'отключена'}`, 'success');}, 'spaceAnim'); loadingBgCard.appendChild(spaceAnimToggle);
  
  const bgAnimCard = createCard('Анимированный бекграунд');
  const bgAnim = getFromLocalStorage('bgAnim', true);
  const bgAnimToggle = createToggle('Анимация с туманностью', bgAnim, (value) => {
    if (window.toggleBG) {window.toggleBG();}
      else {saveToLocalStorage('bgAnim', value);} showNotification(`Анимация с туманностью ${value ? 'включена' : 'отключена'}`, 'success');}, 'bgAnim'); bgAnimCard.appendChild(bgAnimToggle);
  
  const resistanceCard = createCard('Показ резистов');
  const rTab = getFromLocalStorage('rTab', false);
  
  const rTabToggle = createToggle('Резисты в битве', rTab, (value) => {
    if (window.toggleResistanceTab) {window.toggleResistanceTab();} 
      else {saveToLocalStorage('rTab', value); showNotification(`Отображение резистов ${value ? 'включено' : 'отключено'}`, 'success');}}, 'rTab'); resistanceCard.appendChild(rTabToggle);
  
  const fpsCard = createCard('Настройка фейковых значений FPS');
  const fakeFpsEnabled = getFromLocalStorage('fakeFpsEnabled', false);
  const minFps = getFromLocalStorage('minFps', 143);
  const maxFps = getFromLocalStorage('maxFps', 144);
  const fakeFpsToggle = createToggle('Фейковый FPS', fakeFpsEnabled, (value) => {saveToLocalStorage('fakeFpsEnabled', value); 
    if (window.toggleFakeFps) {window.toggleFakeFps(value);} showNotification(`Фейковый FPS ${value ? 'включен' : 'отключен'}`, 'success');}, 'fakeFpsEnabled'); fpsCard.appendChild(fakeFpsToggle);

  const minFpsInput = createNumberInput('Минимальный FPS', minFps, (value) => {saveToLocalStorage('minFps', value); showNotification(`Минимальный FPS установлен на отметке: ${value}`, 'success');}); fpsCard.appendChild(minFpsInput); 
  const maxFpsInput = createNumberInput('Максимальный FPS', maxFps, (value) => {saveToLocalStorage('maxFps', value); showNotification(`Максимальный FPS установлен на отметке: ${value}`, 'success');}); fpsCard.appendChild(maxFpsInput);
    container.appendChild(filtersCard); container.appendChild(animationsCard); container.appendChild(loadingBgCard); container.appendChild(bgAnimCard); container.appendChild(resistanceCard); container.appendChild(fpsCard);
      if (!animationsEnabled) {
        const styleExists = document.querySelector('style[data-bs-animations-disabled]');
          if (!styleExists) {
            const noAnimationsStyle = document.createElement('style'); noAnimationsStyle.dataset.bsAnimationsDisabled = 'true'; noAnimationsStyle.textContent = `* {animation: none !important; transition: none !important;}`; document.head.appendChild(noAnimationsStyle);}}
};