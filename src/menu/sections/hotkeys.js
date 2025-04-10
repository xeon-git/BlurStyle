import {createCard, createToggle, closeModalWithAnimation, showNotification} from '../utils';
import {getFromLocalStorage, saveToLocalStorage} from '../../utils/storage';

let activeModal = null;

export const createHotkeysSection = (container) => {
  const hotkeysEnabledCard = createCard('Управление горячими клавишами');
  const hotkeysEnabled = getFromLocalStorage('hotkeysEnabled', true);
  const hotkeysToggle = createToggle('Горячие клавиши', hotkeysEnabled, (value) => {saveToLocalStorage('hotkeysEnabled', value);}); hotkeysEnabledCard.appendChild(hotkeysToggle);
  const hotkeyBindings = {
    toggleFilters: ['Фильтры', getFromLocalStorage('hotkey_toggleFilters', 'Backslash')],
    toggleBgAnim: ['Анимированный бекграунд', getFromLocalStorage('hotkey_toggleBgAnim', 'BracketRight')],
    toggleResistanceTab: ['Показ резистов в табе', getFromLocalStorage('hotkey_toggleResistanceTab', 'Equal')],
    toggleSpaceAnim: ['Анимированный фон загрузки', getFromLocalStorage('hotkey_toggleSpaceAnim', 'Insert')],
    toggleMenu: ['Вызов/скрытие меню', getFromLocalStorage('hotkey_toggleMenu', 'Home')]};
  
  let modalContainer = document.querySelector('.bs-hotkey-modal');
    if (modalContainer) {modalContainer.remove();} modalContainer = document.createElement('div'); modalContainer.className = 'bs-hotkey-modal';
  
  const modalContent = document.createElement('div'); modalContent.className = 'bs-hotkey-modal-content';
  const modalTitle = document.createElement('h3'); modalTitle.className = 'bs-modal-title';
  const modalText = document.createElement('p'); modalText.style.textAlign = 'center'; modalText.style.color = 'white'; modalText.style.marginBottom = '20px'; modalText.textContent = 'Нажми любую клавишу...';
  const keyDisplay = document.createElement('div'); keyDisplay.className = 'bs-key-display';
  const buttonContainer = document.createElement('div'); buttonContainer.style.display = 'flex'; buttonContainer.style.justifyContent = 'space-between'; buttonContainer.style.gap = '12px';
  const cancelButton = document.createElement('button'); cancelButton.className = 'bs-btn bs-cancel-btn'; cancelButton.textContent = 'Отмена';
  const saveButton = document.createElement('button'); saveButton.className = 'bs-btn bs-save-btn'; saveButton.textContent = 'Сохранить'; saveButton.style.backgroundColor = 'rgba(222, 184, 135, 0.3)'; buttonContainer.appendChild(cancelButton); buttonContainer.appendChild(saveButton);
    modalContent.appendChild(modalTitle); modalContent.appendChild(modalText); modalContent.appendChild(keyDisplay); modalContent.appendChild(buttonContainer); modalContainer.appendChild(modalContent); document.body.appendChild(modalContainer);
      modalContainer.addEventListener('click', (e) => {e.stopPropagation();});
  
  let currentKey = '';
  let currentKeyCode = '';
  let currentHotkeyId = '';
  let keydownHandler = null;
  
  const closeExistingModal = () => {
    if (activeModal) {
      document.removeEventListener('keydown', keydownHandler); closeModalWithAnimation(activeModal); activeModal = null;}};
  
  const openHotkeyModal = (hotkeyId, hotkeyName, currentValue) => {closeExistingModal();
    currentHotkeyId = hotkeyId; currentKey = ''; currentKeyCode = ''; modalContainer.style.display = 'flex'; document.querySelector('.bs-modal-title').textContent = `${hotkeyName}`; document.querySelector('.bs-key-display').textContent = getKeyNameFromCode(currentValue); activeModal = modalContainer;
      if (keydownHandler) {document.removeEventListener('keydown', keydownHandler);} 
    
    keydownHandler = (e) => {e.preventDefault(); e.stopPropagation();
      if (e.code === 'Escape') {closeModalWithAnimation(modalContainer); activeModal = null;
        return;} currentKey = e.key; currentKeyCode = e.code; document.querySelector('.bs-key-display').textContent = currentKey;};

    document.addEventListener('keydown', keydownHandler); 
      document.querySelector('.bs-cancel-btn').onclick = (e) => {e.stopPropagation(); 
        document.removeEventListener('keydown', keydownHandler); closeModalWithAnimation(modalContainer); activeModal = null;};
    
    document.querySelector('.bs-save-btn').onclick = (e) => {e.stopPropagation();
      if (currentKeyCode) {saveToLocalStorage(`hotkey_${currentHotkeyId}`, currentKeyCode);
        const valueDisplay = document.querySelector(`[data-hotkey="${currentHotkeyId}"] .bs-hotkey-value`);
          if (valueDisplay) {valueDisplay.textContent = currentKey;}
            if (hotkeyId === 'toggleMenu') {
              const menuKey = document.getElementById('bs-menu-key');
                if (menuKey) {menuKey.textContent = currentKey;}} showNotification('Горячая клавиша сохранена', 'success');}
                  document.removeEventListener('keydown', keydownHandler); closeModalWithAnimation(modalContainer); activeModal = null;};};
  
  const getKeyNameFromCode = (code) => {
    const keyMap = {
      'Backslash': '\\',
      'BracketRight': ']',
      'Equal': '=',
      'Insert': 'Insert',
      'Home': 'Home'};
        return keyMap[code] || code;};
    
  const hotkeysCard = createCard('Настройка горячих клавиш');
    Object.entries(hotkeyBindings).forEach(([key, [label, value]]) => {
      const hotkeyContainer = document.createElement('div'); hotkeyContainer.className = 'bs-hotkey-item'; hotkeyContainer.dataset.hotkey = key;
      const hotkeyLabel = document.createElement('span'); hotkeyLabel.className = 'bs-hotkey-label'; hotkeyLabel.textContent = label;
      const hotkeyButton = document.createElement('button'); hotkeyButton.className = 'bs-hotkey-button';
      const hotkeyValue = document.createElement('span'); hotkeyValue.className = 'bs-hotkey-value'; hotkeyValue.textContent = getKeyNameFromCode(value);
        if (key === 'toggleMenu') {hotkeyValue.id = 'bs-menu-key';}
      
      hotkeyButton.appendChild(hotkeyValue); hotkeyButton.addEventListener('click', (e) => {e.stopPropagation(); openHotkeyModal(key, label, value);}); hotkeyContainer.appendChild(hotkeyLabel); hotkeyContainer.appendChild(hotkeyButton); hotkeysCard.appendChild(hotkeyContainer);});
        container.appendChild(hotkeysEnabledCard); container.appendChild(hotkeysCard);
        
  document.addEventListener('click', (e) => {
    if (activeModal && !e.target.closest('.bs-hotkey-modal') && !e.target.closest('.bs-hotkey-button')) {closeExistingModal();}});
};