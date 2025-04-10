import {applyMenuStyles} from './styles';
import {navigateBack, toggleMenuVisibility, createSection, setActiveSection, blockBackgroundEvents} from './utils';
import {saveToLocalStorage, getFromLocalStorage} from '../utils/storage';
import {createMainSection} from './sections/main';
import {createStylingSection} from './sections/styling';
import {createUtilsSection} from './sections/utils';
import {createHotkeysSection} from './sections/hotkeys';
import {createSettingsSection} from './sections/settings';
import {createResourcesSection} from './sections/resources';
import {createAboutSection} from './sections/about';
import {createChangelogSection} from './sections/changelog';

let menuVisible = false;
let menuContainer = null;
let activeSection = 'main';
let navigationHistory = ['main'];

export const initMenu = () => {createMenuContainer(); applyMenuStyles();
  document.addEventListener('bs-settings-change', (e) => {
    const {key, value} = e.detail; updateToggleState(key, value);});
  
    document.addEventListener('keydown', (event) => {
      const menuHotkey = getFromLocalStorage('hotkey_toggleMenu', 'Home');
        if (event.code === menuHotkey) {event.preventDefault();toggleMenuVisibility(); saveToLocalStorage('menuVisible', menuVisible);}
        if (menuVisible && event.key === 'Escape') {
        if (navigationHistory.length > 1) {navigateBack();}
          else {toggleMenuVisibility();} event.preventDefault(); event.stopPropagation();}}); setActiveSection('main', 'BlurStyle');};

export const updateToggleState = (key, value) => {
  const toggles = document.querySelectorAll(`input[type="checkbox"][data-key="${key}"]`);
    toggles.forEach(toggle => {toggle.checked = value;});};

const createMenuContainer = () => {
  if (menuContainer) {menuContainer.remove();} menuContainer = document.createElement('div');  menuContainer.id = 'bs-menu'; menuContainer.className = 'bs-menu-hidden';

  const header = document.createElement('div'); header.className = 'bs-menu-header'; 
  const titleContainer = document.createElement('div'); titleContainer.className = 'bs-menu-title-container';
  const backButton = document.createElement('button');
    backButton.className = 'bs-menu-back';
    backButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12L6 8L10 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    backButton.style.display = 'none';
    backButton.addEventListener('click', navigateBack);
    titleContainer.appendChild(backButton);
  
  const title = document.createElement('h2'); title.textContent = 'BlurStyle'; title.id = 'bs-menu-title'; titleContainer.appendChild(title); header.appendChild(titleContainer);
  const closeButton = document.createElement('button'); 
    closeButton.className = 'bs-menu-close'; 
    closeButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    closeButton.addEventListener('click', toggleMenuVisibility); 
    header.appendChild(closeButton);
  
  const content = document.createElement('div'); content.className = 'bs-menu-content';
  const sections = {
    main: {name: 'Главная', create: createMainSection},
    styling: {name: 'Стилизация', create: createStylingSection},
    utils: {name: 'Утилиты', create: createUtilsSection},
    hotkeys: {name: 'Горячие клавиши', create: createHotkeysSection},
    resources: {name: 'Ресурсы', create: createResourcesSection},
    settings: {name: 'Настройки', create: createSettingsSection},
    changelog: {name: 'Чейнджлог', create: createChangelogSection},
    about: {name: 'О проекте', create: createAboutSection}};
      Object.entries(sections).forEach(([id, section]) => {content.appendChild(createSection(id, section.create));}); menuContainer.appendChild(header); menuContainer.appendChild(content); document.body.appendChild(menuContainer);
};

export {menuVisible, menuContainer, activeSection, navigationHistory};