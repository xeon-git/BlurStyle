import {getFromLocalStorage} from './storage';

export const handleMouseMove = (e, card) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const xPercent = (x / rect.width) * 110;
  const yPercent = (y / rect.height) * 110;
  const perspective = getFromLocalStorage('style_transform-perspective', '300');
  const intensity = getFromLocalStorage('style_transform-rotation', '5');
  const shadow = getFromLocalStorage('style_transform-shadow', '0rem 0rem 0.7rem 0.05rem rgba(255, 255, 255, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)');
  
  const rotateX = ((yPercent / 50 - 1) * intensity);
  const rotateY = ((xPercent / 50 - 1) * intensity);
    card.style.transition = 'box-shadow 0.7s, border-color 0.7s';
    card.style.transformOrigin = 'center center';
    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = shadow;};

export const resetTransform = (card) => {
  const resetShadow = getFromLocalStorage('style_transform-reset-shadow', '0rem 0rem 0.3rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)');
    card.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.7s, border-color 0.7s';
    card.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = resetShadow;};