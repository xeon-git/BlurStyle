import {getFromLocalStorage} from './storage';

export const mouseHover = (element, el) => {
  Object.entries(element.styles).forEach(([style, value]) => {el.style[style] = value;});
    if (element.tag.includes('BHV')) {el.addEventListener('mouseover', () => {
      const borderDuration = getFromLocalStorage('style_hover-border-duration', '1');
      const transformDuration = getFromLocalStorage('style_hover-transform-duration', '0.7');
      const scale = getFromLocalStorage('style_hover-scale', '0.97');
      const borderColor = getFromLocalStorage('style_hover-border-color', 'rgba(255, 255, 255, 1)');
      const borderWidth = getFromLocalStorage('style_hover-border-width', '0.15');
        el.style.transition = `border-color ${borderDuration}s, transform ${transformDuration}s`; 
        el.style.transform = `scale(${scale})`;
        el.style.border = `${borderWidth}rem solid ${borderColor}`;});
  
    el.addEventListener('mouseout', () => {
      const borderDuration = getFromLocalStorage('style_hover-border-duration', '1');
      const transformDuration = getFromLocalStorage('style_hover-transform-duration', '0.7');
        el.style.transition = `border-color ${borderDuration}s, transform ${transformDuration}s`; 
        el.style.transform = 'scale(1)'; 
        el.style.border = element.styles.border;});}
          else if (element.tag.includes('RHV')) {
            el.addEventListener('mouseover', () => {
              const radiusDuration = getFromLocalStorage('style_hover-radius-duration', '0.5');
              const radius = getFromLocalStorage('style_hover-radius', '1.1');
                el.style.transition = `background ${radiusDuration}s`; 
                el.style.borderRadius = `${radius}rem`;});
  
    el.addEventListener('mouseout', () => {
      const radiusDuration = getFromLocalStorage('style_hover-radius-duration', '0.5');
        el.style.transition = `background ${radiusDuration}s`; 
        el.style.borderRadius = element.styles.borderRadius;});}};