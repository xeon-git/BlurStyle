import {saveToLocalStorage, getFromLocalStorage} from '../utils/storage';
import {chatActive} from '../utils/state';
import {checkChatState} from '../utils/checkChatState';

export const cssBg = () => {
  let bgAnim = getFromLocalStorage('bgAnim', true);

  const styleElement = document.createElement('style'); styleElement.textContent = `
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
      will-change: transform;
    }

    @keyframes gradientBg {from {background-position: 50% 50%, 50% 50%;} to {background-position: 350% 50%, 350% 50%;}}`;

  const toggleBG = () => {checkChatState();
    if (!chatActive) {bgAnim = !bgAnim;
      if (bgAnim) {document.head.appendChild(styleElement);}
        else {styleElement.remove();} saveToLocalStorage('bgAnim', bgAnim);}};

  const handleKeyDown = (event) => {
    const keyCodeBracket = 221;
      if (event.keyCode === keyCodeBracket) {toggleBG();}};

  document.addEventListener('keydown', handleKeyDown);

  if (bgAnim) {document.head.appendChild(styleElement);}
};