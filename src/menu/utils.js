import {menuVisible, menuContainer, activeSection, navigationHistory} from './index';
import {saveToLocalStorage} from '../utils/storage';

let wasPointerLocked = false;
let pointerLockElement = null;

export const toggleMenuVisibility = () => {
  if (!menuContainer) return;
  
  const isMenuHidden = menuContainer.classList.contains('bs-menu-hidden');
    if (isMenuHidden) {wasPointerLocked = document.pointerLockElement !== null;
      if (wasPointerLocked) {pointerLockElement = document.pointerLockElement; document.exitPointerLock();} menuContainer.classList.remove('bs-menu-hidden'); document.body.classList.add('bs-menu-open');}
        else {
          const allSliders = menuContainer.querySelectorAll('input[type="range"]');
            allSliders.forEach(slider => {
              if (slider.dataset.key && slider.dataset.modified === 'true') {
                const value = parseFloat(slider.value);
                  if (!isNaN(value)) {saveToLocalStorage(`style_${slider.dataset.key}`, value);}}});
                    menuContainer.classList.add('bs-menu-hidden'); document.body.classList.remove('bs-menu-open');
                      if (wasPointerLocked && pointerLockElement) {
                        setTimeout(() => {
                          try {pointerLockElement.requestPointerLock();}
                            catch (e) {
                              try {document.body.requestPointerLock();}
                                catch (e) {console.log("не удалось вернуть блокировку указателя");}}}, 50);}} menuVisible = !menuContainer.classList.contains('bs-menu-hidden');};

export const createSection = (id, createFunction) => {
  const section = document.createElement('div'); section.className = 'bs-menu-section'; section.id = `bs-menu-section-${id}`; id === activeSection && section.classList.add('active'); createFunction(section);
    return section;};

export const setActiveSection = (sectionId, title = null) => {document.querySelectorAll('.bs-menu-section').forEach(section => {section.classList.remove('active');});
  const targetSection = document.getElementById(`bs-menu-section-${sectionId}`);
    if (!targetSection) return; targetSection.classList.add('active');
      if (navigationHistory[navigationHistory.length - 1] !== sectionId) {navigationHistory.push(sectionId);}

  const backButton = document.querySelector('.bs-menu-back');
    if (backButton) {backButton.style.display = navigationHistory.length > 1 ? 'flex' : 'none';}
      if (title) {
        const menuTitle = document.getElementById('bs-menu-title'); menuTitle && (menuTitle.textContent = title);} targetSection.classList.add('bs-section-appear');
          setTimeout(() => {targetSection.classList.remove('bs-section-appear');}, 300);};

export const navigateBack = () => {
  if (navigationHistory.length <= 1) return; navigationHistory.pop();
  const prevSection = navigationHistory[navigationHistory.length - 1];
  const sectionTitles = {
    'main': 'BlurStyle',
    'styling': 'Стилизация',
    'utils': 'Утилиты',
    'hotkeys': 'Горячие клавиши',
    'resources': 'Ресурсы',
    'settings': 'Настройки',
    'about': 'О проекте',
    'changelog': 'Чейнджлог'};
      const title = sectionTitles[prevSection] || 'BlurStyle'; setActiveSection(prevSection, title);};

export const showNotification = (message, type = 'success') => {
  const existingNotification = document.querySelector('.bs-notification'); existingNotification?.remove();
  const notification = document.createElement('div'); notification.className = `bs-notification bs-notification-${type}`;
  const icons = {
    success: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 8L7.16667 9.66667L10.5 6.33334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6L6 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L10 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    info: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 5V8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11.01L8.01 10.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
      notification.innerHTML = `<div class="bs-notification-content">${icons[type] || icons.info}<span>${message}</span></div>`;
  
  const colors = {success: 'rgba(222, 184, 135, 0.5)', error: 'rgba(255, 107, 107, 0.8)', info: 'rgba(222, 184, 135, 0.5)'};
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: colors[type] || colors.info,
      color: 'white',
      padding: '10px 16px',
      borderRadius: '0.7rem',
      zIndex: '10001',
      display: 'flex',
      alignItems: 'center',
      backdropFilter: 'blur(0.3rem)',
      animation: 'fadeInUp 0.3s ease-out',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}); document.body.appendChild(notification);
  
  setTimeout(() => {notification.style.animation = 'fadeOutDown 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);}, 2000);};

    export const createToggle = (labelText, isChecked, onChange, key) => {
      const container = document.createElement('div'); container.className = 'bs-option';
      const label = document.createElement('span'); label.textContent = labelText;
      const toggleContainer = document.createElement('label'); toggleContainer.className = 'bs-toggle';
      const input = document.createElement('input'); input.type = 'checkbox'; input.checked = isChecked;
        if (key) {input.dataset.key = key;}
          input.addEventListener('change', (e) => {onChange(e.target.checked, key);
            if (labelText?.trim()) {showNotification(`${labelText} ${e.target.checked ? 'вкл' : 'выкл'}`, 'success');}});
      
      const slider = document.createElement('span'); slider.className = 'bs-toggle-slider'; toggleContainer.append(input, slider); container.append(label, toggleContainer);
        return container;};

        export const createSlider = (labelText, value, min, max, onChange, key) => {
          const container = document.createElement('div'); container.className = 'bs-option bs-slider-container';
          const label = document.createElement('span'); label.textContent = labelText; label.className = 'bs-slider-label';
          const controlContainer = document.createElement('div'); controlContainer.className = 'bs-slider-control';
          const slider = document.createElement('input'); slider.type = 'range'; slider.className = 'bs-slider'; slider.min = min; slider.max = max; slider.value = value; slider.step = '0.01';
            if (key) slider.dataset.key = key;
              const valueDisplay = document.createElement('span'); valueDisplay.className = 'bs-slider-value'; valueDisplay.textContent = value;
              let timeout;
          
          slider.addEventListener('input', (e) => {
            const newValue = parseFloat(e.target.value); valueDisplay.textContent = newValue;
              slider.dataset.modified = 'true';
                onChange(newValue, key); clearTimeout(timeout);
                  timeout = setTimeout(() => {
                    if (labelText?.trim()) {
                      const simplifiedLabel = labelText.replace(':', '');
                        showNotification(`${simplifiedLabel}: ${newValue}`, 'info');}}, 500);}); controlContainer.append(slider, valueDisplay); container.append(label, controlContainer);
                          return container;};

export const createInputField = (labelText, value, onChange, key) => {
  const container = document.createElement('div'); container.className = 'bs-option';
  const label = document.createElement('span'); label.textContent = labelText; label.className = 'bs-input-label';
  const input = document.createElement('input'); input.type = 'text'; input.className = 'bs-input'; input.value = value; 
    input.addEventListener('change', (e) => {
      onChange(e.target.value, key);
        if (labelText?.trim()) {showNotification(`${labelText} изменено`, 'success');}}); container.append(label, input);
          return container;};

export const createNumberInput = (labelText, value, onChange, key) => {
  const container = document.createElement('div'); container.className = 'bs-option';
  const label = document.createElement('span'); label.textContent = labelText; label.className = 'bs-input-label';
  const input = document.createElement('input'); input.type = 'number'; input.className = 'bs-input'; input.value = value;
    input.addEventListener('change', (e) => {
      onChange(parseInt(e.target.value), key);
        if (labelText?.trim()) {showNotification(`${labelText} установлено: ${e.target.value}`, 'success');}}); container.append(label, input);
          return container;};

export const createButton = (text, onClick, className = '') => {
  const button = document.createElement('button'); button.className = `bs-btn ${className}`; button.textContent = text;
    button.addEventListener('click', (e) => {e.stopPropagation(); onClick();});
      return button;};

export const createCard = (title, onClick = null) => {
  const card = document.createElement('div'); card.className = onClick ? 'bs-card bs-card-clickable' : 'bs-card';
    if (title) {
      const titleElement = document.createElement('h3'); titleElement.className = 'bs-card-title'; titleElement.textContent = title; card.appendChild(titleElement);} onClick && card.addEventListener('click', onClick);
        return card;};

export const createNavCard = (title, onClick, description = null, icon = null) => {
  const card = document.createElement('div'); card.className = 'bs-nav-card';
    if (icon) {
      const iconElement = document.createElement('div'); iconElement.className = 'bs-nav-card-icon'; iconElement.innerHTML = icon; card.appendChild(iconElement);}
  
  const contentContainer = document.createElement('div'); contentContainer.className = 'bs-nav-card-content';
  const titleElement = document.createElement('h3'); titleElement.className = 'bs-nav-card-title'; titleElement.textContent = title; contentContainer.appendChild(titleElement);
    if (description) {
      const descElement = document.createElement('p'); descElement.className = 'bs-nav-card-description'; descElement.textContent = description; contentContainer.appendChild(descElement);}
  
  const arrowIcon = document.createElement('div');
    arrowIcon.className = 'bs-nav-card-arrow';
    arrowIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L10 8L6 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; 
    card.append(contentContainer, arrowIcon); card.addEventListener('click', onClick);
      return card;};

export const closeModalWithAnimation = (modalElement, onClose) => {
  if (!modalElement) return; modalElement.classList.add('closing');
    setTimeout(() => {modalElement.style.display = 'none'; modalElement.classList.remove('closing'); onClose?.();}, 300);
};