import {setChatActive} from '../utils/state';

export const checkChatState = () => {
  const chatStateAll = document.querySelector('.BattleChatComponentStyle-inputContainerAll');
  const chatStateAllies = document.querySelector('.BattleChatComponentStyle-inputContainerAllies');
    setChatActive(!!(chatStateAll || chatStateAllies));};