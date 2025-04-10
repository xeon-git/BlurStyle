import {createCard, createButton, closeModalWithAnimation, showNotification} from '../utils';
import {getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage, getAllKeysStartingWith} from '../../utils/storage';

export const createSettingsSection = (container) => {
  const settingsCard = createCard('Управление настройками');
  const exportButton = createButton('Экспорт настроек', () => {
    try {
      const settings = {};
      const prefixes = ['bs_', 'style_', 'hotkey_'];
      const specificKeys = [
        'filters', 'spaceAnim', 'bgAnim', 'rTab', 
        'saturationValue', 'contrastValue', 'minFps', 'maxFps', 
        'fakeFpsEnabled', 'customResourcesEnabled', 'resourcesState',
        'animationsEnabled', 'hotkeysEnabled'];
          prefixes.forEach(prefix => {
            const keys = getAllKeysStartingWith(prefix);
              keys.forEach(key => {settings[key] = localStorage.getItem(key);});});
                specificKeys.forEach(key => {
                  if (localStorage.getItem(key) !== null) {settings[key] = localStorage.getItem(key);}});
      
      const dataStr = JSON.stringify(settings, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportLink = document.createElement('a'); exportLink.setAttribute('href', dataUri); exportLink.setAttribute('download', 'blurstyle-settings.json'); exportLink.click(); showNotification('Настройки успешно экспортированы', 'success');} 
        catch (error) {console.error('Ошибка при экспорте настроек:', error); showNotification('Ошибка при экспорте настроек', 'error');}}, 'bs-btn-primary');
  
  const importContainer = document.createElement('div'); importContainer.className = 'bs-row';
  const importInput = document.createElement('input'); importInput.type = 'file'; importInput.accept = '.json'; importInput.style.display = 'none';
  const importButton = createButton('Импорт настроек', () => {importInput.click();});
    importInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
        if (file) {
          const reader = new FileReader(); 
            reader.onload = (e) => {
              try {
                const settings = JSON.parse(e.target.result);
                  Object.entries(settings).forEach(([key, value]) => {localStorage.setItem(key, value);}); showNotification('Настройки успешно импортированы, для их применения перезагрузи страницу', 'success');}
                    catch (error) {console.error('Ошибка при импорте:', error); showNotification('Ошибка при импорте настроек: ' + error.message, 'error');}}; reader.readAsText(file);}}); importContainer.appendChild(importButton); importContainer.appendChild(importInput);
  
  const resetButton = createButton('Сброс настроек', () => {
    const modal = document.createElement('div'); modal.className = 'bs-confirm-modal bs-hotkey-modal'; modal.style.display = 'flex';
    const modalContent = document.createElement('div'); modalContent.className = 'bs-hotkey-modal-content';
    const modalIcon = document.createElement('div'); modalIcon.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#FF6B6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 16V24" stroke="#FF6B6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 32H24.02" stroke="#FF6B6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`; modalIcon.style.marginBottom = '16px'; modalIcon.style.textAlign = 'center';
    
    const modalTitle = document.createElement('h3'); modalTitle.textContent = 'Сбросить настройки?'; modalTitle.className = 'bs-modal-title';
    const modalText = document.createElement('p'); modalText.textContent = 'Ты уверен, что хочешь сбросить все настройки до значений по умолчанию?'; modalText.style.margin = '0 0 24px 0'; modalText.style.color = 'rgba(255, 255, 255, 0.7)'; modalText.style.textAlign = 'center';
    const buttonContainer = document.createElement('div'); buttonContainer.style.display = 'flex'; buttonContainer.style.gap = '12px'; buttonContainer.style.justifyContent = 'center';
    const cancelBtn = document.createElement('button'); cancelBtn.textContent = 'Отмена'; cancelBtn.className = 'bs-btn'; cancelBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    const confirmBtn = document.createElement('button'); confirmBtn.textContent = 'Сбросить'; confirmBtn.className = 'bs-btn'; confirmBtn.style.background = 'rgba(255, 107, 107, 0.3)'; buttonContainer.appendChild(cancelBtn); buttonContainer.appendChild(confirmBtn);
    
    modalContent.appendChild(modalIcon); modalContent.appendChild(modalTitle); modalContent.appendChild(modalText); modalContent.appendChild(buttonContainer); modal.appendChild(modalContent); document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {e.stopPropagation();});
    
    cancelBtn.addEventListener('click', (e) => {e.stopPropagation(); closeModalWithAnimation(modal);});
    confirmBtn.addEventListener('click', (e) => {e.stopPropagation();
      const prefixes = ['bs_', 'style_', 'hotkey_'];
      const specificKeys = [
        'filters', 'spaceAnim', 'bgAnim', 'rTab', 
        'saturationValue', 'contrastValue', 'minFps', 'maxFps', 
        'fakeFpsEnabled', 'customResourcesEnabled', 'resourcesState',
        'animationsEnabled', 'hotkeysEnabled', 'menuVisible'];
          prefixes.forEach(prefix => {
            const keys = getAllKeysStartingWith(prefix);
              keys.forEach(key => removeFromLocalStorage(key));});
                specificKeys.forEach(key => removeFromLocalStorage(key)); closeModalWithAnimation(modal); showNotification('Настройки успешно сброшены, для их применения перезагрузи страницу', 'error');});}, 'bs-btn-danger');
  
  resetButton.style.backgroundColor = 'rgba(255, 107, 107, 0.3)'; resetButton.addEventListener('mouseenter', () => {resetButton.style.backgroundColor = 'rgba(255, 107, 107, 0.4)';});
  resetButton.addEventListener('mouseleave', () => {resetButton.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';});
  
  const buttonsContainer = document.createElement('div'); buttonsContainer.style.display = 'flex'; buttonsContainer.style.gap = '12px'; buttonsContainer.style.marginTop = '8px'; buttonsContainer.appendChild(exportButton); buttonsContainer.appendChild(importButton);
    settingsCard.appendChild(buttonsContainer); settingsCard.appendChild(importContainer); settingsCard.appendChild(document.createElement('br')); settingsCard.appendChild(resetButton); container.appendChild(settingsCard);
};