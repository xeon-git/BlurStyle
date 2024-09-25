import {chatActive} from '../utils/state';
import {checkChatState} from '../utils/checkChatState';

export const fakeFPS = () => {
  const getRandomFPS = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  document.addEventListener('keydown', (event) => {checkChatState();
    if (chatActive) return;

    if (event.key === '-') {
      const minFPSInput = prompt('Введи минимальное количество фпс:', '143');
      const maxFPSInput = prompt('Введи максимальное количество фпс:', '144');

      const minFPS = parseInt(minFPSInput) || 143;
      const maxFPS = parseInt(maxFPSInput) || 144;

      const FPSContainer = document.querySelector('#root > div > div > div.BattleHudComponentStyle-buttonsContainer > div > div > div:nth-child(1)');
        if (!FPSContainer) return;

      const existingFPS = FPSContainer.querySelector('.BattleHudFpsComponentStyle-value');
        if (existingFPS) existingFPS.remove();

      const fakeFPSElement = document.createElement('span'); fakeFPSElement.classList.add('BattleHudFpsComponentStyle-value'); FPSContainer.appendChild(fakeFPSElement);

      const updateFPS = () => {
        const fpsValue = getRandomFPS(minFPS, maxFPS); fakeFPSElement.innerText = fpsValue;
          if (fpsValue < 20) {fakeFPSElement.style.color = 'rgb(255, 82, 9)';}
            else if (fpsValue >= 20 && fpsValue <= 40) {fakeFPSElement.style.color = 'rgb(255, 188, 9)';}
              else if (fpsValue > 40) {fakeFPSElement.style.color = 'rgb(116, 186, 61)';}};
                updateFPS(); setInterval(updateFPS, 3000);}});};