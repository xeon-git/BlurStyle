import {saveToLocalStorage, getFromLocalStorage} from '../utils/storage';

export const canvasBg = () => {
  let spaceAnim = getFromLocalStorage('spaceAnim', true);

  const styleBlock = document.createElement('style'); styleBlock.innerHTML = `
    .ApplicationLoaderComponentStyle-container {position: fixed; overflow: hidden;}
    .canvasWrapper {position: fixed; top: 0; left: 0; z-index: 99;}
    canvas {display: block; position: fixed;}`; document.head.appendChild(styleBlock);

  const applyAnimationToBackground = (loadBg) => {
    if (!loadBg) return;

    if (loadBg.dataset.animationInitialized) return; loadBg.dataset.animationInitialized = true;

    const canvas = document.createElement('canvas'); canvas.id = 'field';

    const canvasWrapper = document.createElement('div'); canvasWrapper.className = 'canvasWrapper'; loadBg.appendChild(canvasWrapper); canvasWrapper.appendChild(canvas); canvas.width = loadBg.clientWidth; canvas.height = loadBg.clientHeight;

    const stars = [];
    const starsToDraw = (canvas.width * canvas.height) / 5000;

    let animationInterval;

    const draw = () => {
      if (!spaceAnim || !loadBg || !canvas || !canvas.getContext) {clearInterval(animationInterval);
        return;}

      if (canvas.width !== loadBg.clientWidth) {canvas.width = loadBg.clientWidth;}

      if (canvas.height !== loadBg.clientHeight) {canvas.height = loadBg.clientHeight;}

      const ctx = canvas.getContext('2d'); ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; ctx.fillRect(0, 0, canvas.width, canvas.height);

      while (stars.length < starsToDraw) {stars.push(new Star(canvas));} stars.forEach((star, index) => {star.draw();
        if (star.isOutOfBounds()) {stars.splice(index, 1);}});};

    class Star {
      constructor(canvas) {this.canvas = canvas; this.X = canvas.width / 2; this.Y = canvas.height / 2; this.SX = Math.random() * 10 - 5; this.SY = Math.random() * 10 - 5;
        const start = canvas.width > canvas.height ? canvas.width : canvas.height; this.X += (this.SX * start) / 10; this.Y += (this.SY * start) / 10; this.W = 1; this.H = 1; this.age = 0; this.dies = 500; this.C = '#ffffff';}

      draw() {
        if (!this.canvas) return;

        const ctx = this.canvas.getContext('2d'); this.X += this.SX; this.Y += this.SY; this.SX += this.SX / 50; this.SY += this.SY / 50; this.age++;

        if (this.age === 50 || this.age === 150 || this.age === 300) {this.W++; this.H++;} ctx.fillStyle = this.C; ctx.fillRect(this.X, this.Y, this.W, this.H);}

      isOutOfBounds() {
        return (this.X + this.W < 0 || this.X > this.canvas.width || this.Y + this.H < 0 || this.Y > this.canvas.height);}}

    animationInterval = setInterval(draw, 20); loadBg.dataset.animationInterval = animationInterval; loadBg.dataset.canvasId = canvas.id;};

  const removeAnimationFromBackground = (loadBg) => {
    if (!loadBg) return;

    const animationInterval = loadBg.dataset.animationInterval;
    const canvasId = loadBg.dataset.canvasId;

    clearInterval(animationInterval);

    if (canvasId) {
      const canvasElement = document.getElementById(canvasId);
        if (canvasElement) {canvasElement.parentNode.remove();}}
          delete loadBg.dataset.animationInterval; delete loadBg.dataset.canvasId; delete loadBg.dataset.animationInitialized;};

  const toggleAnimation = () => {
    if (spaceAnim) {document.querySelectorAll('.ApplicationLoaderComponentStyle-container').forEach((node) => {removeAnimationFromBackground(node);});}
     else {document.querySelectorAll('.ApplicationLoaderComponentStyle-container').forEach((node) => {applyAnimationToBackground(node);});}
      spaceAnim = !spaceAnim; saveToLocalStorage('spaceAnim', spaceAnim);};

  const observer = new MutationObserver((mutations) => {mutations.forEach((mutation) => {mutation.addedNodes.forEach((node) => {
    if (node.nodeType === 1 && node.classList.contains('ApplicationLoaderComponentStyle-container')) {applyAnimationToBackground(node);}});
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains('ApplicationLoaderComponentStyle-container')) {removeAnimationFromBackground(node);}});});});
  
  observer.observe(document.body, {childList: true, subtree: true});

  document.querySelectorAll('.ApplicationLoaderComponentStyle-container').forEach((node) => {applyAnimationToBackground(node);});

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Insert') {toggleAnimation();}});
};