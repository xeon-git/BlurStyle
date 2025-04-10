import {saveToLocalStorage, getFromLocalStorage} from './storage';
import {chatActive} from './state';
import {checkChatState} from './checkChatState';

let styleElement = null;

export const cssBg = () => {
  let bgAnim = getFromLocalStorage('bgAnim', true);

  const styleText = `
    .Common-entranceGradient, #app-root, .Common-Container {position: relative; overflow: hidden; background: black;}
    .Common-entranceGradient::before, #app-root::before, .Common-container::before {
      content: "";
      position: absolute;
      inset: 0;
      --stripes: repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%);
      --stripesDark: repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%);
      --rainbow: repeating-linear-gradient(100deg, #fff 10%, #000 15%, #fff 20%, #000 25%, #fff 30%);
      background-image: var(--stripes), var(--rainbow);
      background-size: 200%, 100%;
      animation: gradientBg 60s linear infinite;
      background-attachment: fixed;
      mix-blend-mode: difference;
      filter: blur(14rem) invert(100%);
      will-change: transform;}
    @keyframes gradientBg {from {background-position: 50% 50%, 50% 50%;} to {background-position: 350% 50%, 350% 50%;}}`;

    const toggleBG = () => {checkChatState();
      if (!chatActive) {bgAnim = !bgAnim;
        if (bgAnim) {applyStyle();} 
          else {removeStyle();} saveToLocalStorage('bgAnim', bgAnim);
            document.dispatchEvent(new CustomEvent('bs-settings-change', {detail: {key: 'bgAnim', value: bgAnim}}));
              return bgAnim;}};
  
  window.toggleBG = toggleBG;
  
  const applyStyle = () => {removeStyle(); styleElement = document.createElement('style'); styleElement.dataset.bsBgAnim = 'true'; styleElement.textContent = styleText; document.head.appendChild(styleElement);};
  const removeStyle = () => {
    if (styleElement) {styleElement.remove(); styleElement = null;}
      else {
        const existing = document.querySelector('[data-bs-bg-anim="true"]'); existing && existing.remove();}};

  document.addEventListener('keydown', (event) => {
    const hotkey = getFromLocalStorage('hotkey_toggleBgAnim', 'BracketRight');
    const hotkeysEnabled = getFromLocalStorage('hotkeysEnabled', true);
      if (event.code === hotkey && hotkeysEnabled) {toggleBG();}}); bgAnim && applyStyle();
};