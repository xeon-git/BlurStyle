import {saveToLocalStorage, getFromLocalStorage} from './storage';

let activeCanvases = new Map();
let globalObserver = null;

export const canvasBg = () => {
  let spaceAnim = getFromLocalStorage('spaceAnim', true);

  const styleBlock = document.createElement('style'); 
    styleBlock.textContent = `.ApplicationLoaderComponentStyle-container {position: fixed; overflow: hidden;} .bs-canvas-wrapper {position: fixed; top: 0; left: 0; z-index: 99;}.bs-star-canvas {display: block; position: fixed;}`; document.head.appendChild(styleBlock);

  const createStar = (canvas) => {
    const star = {canvas, X: canvas.width / 2, Y: canvas.height / 2, SX: Math.random() * 10 - 5, SY: Math.random() * 10 - 5, W: 1, H: 1, age: 0, dies: 500, C: '#ffffff',
      draw: () => {
        if (!star.canvas) return;

        const ctx = star.canvas.getContext('2d'); star.X += star.SX; star.Y += star.SY; star.SX += star.SX / 50; star.SY += star.SY / 50; star.age++;
          if (star.age === 50 || star.age === 150 || star.age === 300) {star.W++; star.H++;} ctx.fillStyle = star.C; ctx.fillRect(star.X, star.Y, star.W, star.H);},
      
      isOutOfBounds: () => {
        return (star.X + star.W < 0 || star.X > star.canvas.width || star.Y + star.H < 0 || star.Y > star.canvas.height);}};

    const start = star.canvas.width > star.canvas.height ? star.canvas.width : star.canvas.height; star.X += (star.SX * start) / 10; star.Y += (star.SY * start) / 10;
      return star;};

  const applyAnimationToBackground = (loadBg) => {
    if (!loadBg || !spaceAnim || activeCanvases.has(loadBg)) return;

    const canvasWrapper = document.createElement('div'); canvasWrapper.className = 'bs-canvas-wrapper'; loadBg.appendChild(canvasWrapper);
    const canvas = document.createElement('canvas'); canvas.className = 'bs-star-canvas'; canvas.width = loadBg.clientWidth; canvas.height = loadBg.clientHeight; canvasWrapper.appendChild(canvas);
    const stars = [];
    const starsToDraw = (canvas.width * canvas.height) / 5000;

    const draw = () => {
      if (!spaceAnim || !activeCanvases.has(loadBg)) return;
      if (canvas.width !== loadBg.clientWidth) {canvas.width = loadBg.clientWidth;}
      if (canvas.height !== loadBg.clientHeight) {canvas.height = loadBg.clientHeight;}

      const ctx = canvas.getContext('2d'); ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        while (stars.length < starsToDraw) {stars.push(createStar(canvas));}
          for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]; star.draw();
              if (star.isOutOfBounds()) {stars.splice(i, 1);}}};

    const animationInterval = setInterval(draw, 20); activeCanvases.set(loadBg, {wrapper: canvasWrapper, interval: animationInterval});};

  const removeAnimationFromBackground = (loadBg) => {
    if (!loadBg || !activeCanvases.has(loadBg)) return;

    const {wrapper, interval} = activeCanvases.get(loadBg); clearInterval(interval); wrapper && wrapper.remove(); activeCanvases.delete(loadBg);};

    const toggleAnimation = () => {spaceAnim = !spaceAnim;
      if (!spaceAnim) {
        activeCanvases.forEach((_, loadBg) => {removeAnimationFromBackground(loadBg);}); activeCanvases.clear();}
          else {
            document.querySelectorAll('.ApplicationLoaderComponentStyle-container').forEach((node) => {applyAnimationToBackground(node);});} saveToLocalStorage('spaceAnim', spaceAnim);
              document.dispatchEvent(new CustomEvent('bs-settings-change', {detail: {key: 'spaceAnim', value: spaceAnim}}));
                return spaceAnim;};

  window.toggleStarAnimation = toggleAnimation;

  if (globalObserver) {globalObserver.disconnect(); globalObserver = null;}

  globalObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      Array.from(mutation.addedNodes)
        .filter(node => node.nodeType === 1 && node.classList?.contains('ApplicationLoaderComponentStyle-container'))
        .forEach(node => spaceAnim && applyAnimationToBackground(node));
      
      Array.from(mutation.removedNodes)
        .filter(node => node.nodeType === 1 && node.classList?.contains('ApplicationLoaderComponentStyle-container'))
        .forEach(node => removeAnimationFromBackground(node));});});
  
  globalObserver.observe(document.body, {childList: true, subtree: true, attributes: false, characterData: false});
  document.querySelectorAll('.ApplicationLoaderComponentStyle-container')
    .forEach(node => spaceAnim && applyAnimationToBackground(node));

  document.addEventListener('keydown', (event) => {
    const hotkey = getFromLocalStorage('hotkey_toggleSpaceAnim', 'Insert');
    const hotkeysEnabled = getFromLocalStorage('hotkeysEnabled', true);
      if (event.code === hotkey && hotkeysEnabled) {toggleAnimation();}});
};