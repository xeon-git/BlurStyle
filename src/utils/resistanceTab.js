import {saveToLocalStorage, getFromLocalStorage} from '../utils/storage';
import {chatActive} from '../utils/state';
import {checkChatState} from '../utils/checkChatState';

export const resistanceTab = () => {
  let rTab = getFromLocalStorage('rTab', false);

  const applyTab = () => {
    const css = `
      td.BattleTabStatisticComponentStyle-nicknameCell > div > div > div {width: 8rem !important;}
      .BattleTabStatisticComponentStyle-nicknameCell {margin-right: 1rem;}
      .BattleTabStatisticComponentStyle-resistanceModuleCell {visibility: unset; margin-right: 11rem;}`; addStyle(css);};

  const addStyle = (css) => {
    const body = document.body || document.getElementsByTagName('body')[0];
    const style = document.createElement('style'); style.className = 'css';
      if (style.styleSheet) {style.styleSheet.cssText = css;}
        else {style.appendChild(document.createTextNode(css));} body.appendChild(style);};

  const removeTab = () => {
    const styleElement = document.querySelector('.css');
      if (styleElement) {styleElement.remove();}};

  const toggleScript = () => {rTab = !rTab;
    if (rTab) {applyTab();}
      else {removeTab();} saveToLocalStorage('rTab', rTab);};

  if (rTab) {applyTab();}

  document.addEventListener('keydown', (event) => {checkChatState();
    if (!chatActive && event.key === '=') {toggleScript();}});
};