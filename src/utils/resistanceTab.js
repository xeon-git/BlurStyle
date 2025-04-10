import {saveToLocalStorage, getFromLocalStorage} from './storage';
import {chatActive} from './state';
import {checkChatState} from './checkChatState';

export const resistanceTab = () => {
  let rTab = getFromLocalStorage('rTab', false);

  const applyTab = () => {removeTab();
    const css = `
      .BattleTabStatisticComponentStyle-redTeamTableContainer>table>thead>tr>th:nth-child(1), .BattleTabStatisticComponentStyle-blueTeamTableContainer>table>thead>tr>th:nth-child(1) {width: 31rem !important;}
      .BattleTabStatisticComponentStyle-redTeamTableContainer>table>thead>tr>th:nth-child(2), .BattleTabStatisticComponentStyle-blueTeamTableContainer>table>thead>tr>th:nth-child(2) {margin-right: 1rem !important;}
      .BattleTabStatisticComponentStyle-redTeamTableContainer>table>thead>tr>th:nth-child(6), .BattleTabStatisticComponentStyle-blueTeamTableContainer>table>thead>tr>th:nth-child(6) {width: 5rem !important;}
      .BattleTabStatisticComponentStyle-gsCell {margin-right: 1rem !important;}
      .BattleTabStatisticComponentStyle-resistanceModuleCell {visibility: unset !important; margin-right: 11rem !important;}`;
    
    const style = document.createElement('style'); style.className = 'bs-rtab-style'; style.innerHTML = css; document.head.appendChild(style);};

  const removeTab = () => {
    const styleElements = document.querySelectorAll('.bs-rtab-style'); styleElements.forEach(el => el.remove());};

  const toggleScript = () => {rTab = !rTab;
    if (rTab) {applyTab();}
      else {removeTab();} saveToLocalStorage('rTab', rTab);
        document.dispatchEvent(new CustomEvent('bs-settings-change', {detail: {key: 'rTab', value: rTab}}));
          return rTab;};
  
  window.toggleResistanceTab = toggleScript;

  if (rTab) {applyTab();}

  document.addEventListener('keydown', (event) => {checkChatState();
    const hotkey = getFromLocalStorage('hotkey_toggleResistanceTab', 'Equal');
    const hotkeysEnabled = getFromLocalStorage('hotkeysEnabled', true);
      if (!chatActive && event.code === hotkey && hotkeysEnabled) {toggleScript();}});
};