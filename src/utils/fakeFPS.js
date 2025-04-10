import {saveToLocalStorage, getFromLocalStorage} from './storage';

let fakeFPSElement = null;
let fpsUpdateTime = 0;
let rafId = null;
let isActive = false;

export const initFakeFPS = () => {
  if (getFromLocalStorage('fakeFpsEnabled', false)) {startFakeFps();}};

export const clearFakeFps = () => {
  if (fakeFPSElement && fakeFPSElement.parentNode) {fakeFPSElement.parentNode.removeChild(fakeFPSElement);}
    else {
      const existingFPS = document.querySelector('.BattleHudFpsComponentStyle-value');
        if (existingFPS) {existingFPS.remove();}} fakeFPSElement = null;};

export const getRandomFPS = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);};

export const updateFpsValue = (timestamp) => {
  if (fakeFPSElement && (!fpsUpdateTime || timestamp - fpsUpdateTime > 3000)) {fpsUpdateTime = timestamp;
    const minFPS = getFromLocalStorage('minFps', 143);
    const maxFPS = getFromLocalStorage('maxFps', 144);
    const fpsValue = getRandomFPS(minFPS, maxFPS); fakeFPSElement.innerText = fpsValue;
    
    if (fpsValue < 20) {fakeFPSElement.style.color = 'rgb(255, 82, 9)';} 
      else if (fpsValue >= 20 && fpsValue <= 40) {fakeFPSElement.style.color = 'rgb(255, 188, 9)';}
        else if (fpsValue > 40) {fakeFPSElement.style.color = 'rgb(116, 186, 61)';}}};

export const animationLoop = (timestamp) => {
  if (!isActive || !getFromLocalStorage('fakeFpsEnabled', false)) {isActive = false; clearFakeFps(); rafId = null;
    return;}

  const FPSContainer = document.querySelector('#root > div > div > div.BattleHudComponentStyle-buttonsContainer > div > div > div:nth-child(1)');
    if (FPSContainer) {
      if (!fakeFPSElement || fakeFPSElement.parentNode !== FPSContainer) {
        clearFakeFps(); 
        fakeFPSElement = document.createElement('span'); 
        fakeFPSElement.classList.add('BattleHudFpsComponentStyle-value'); 
        FPSContainer.appendChild(fakeFPSElement); 
        fpsUpdateTime = 0; 
        updateFpsValue(timestamp);}
          else {updateFpsValue(timestamp);}}
            else if (fakeFPSElement) {clearFakeFps();}
              setTimeout(() => {
                if (isActive) {rafId = requestAnimationFrame(animationLoop);}}, 100);};

export const startFakeFps = () => {isActive = true;
  if (rafId) {cancelAnimationFrame(rafId);} rafId = requestAnimationFrame(animationLoop);};

export const stopFakeFps = () => {isActive = false;
  if (rafId) {cancelAnimationFrame(rafId); rafId = null;} clearFakeFps();};

export const toggleFakeFps = (enabled) => {saveToLocalStorage('fakeFpsEnabled', enabled);
  if (enabled) {startFakeFps();}
    else {stopFakeFps();}
      return enabled;};

export const fakeFPS = () => {window.toggleFakeFps = toggleFakeFps; initFakeFPS();};