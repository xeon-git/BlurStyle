export const mouseHover = (element, el) => {
  Object.entries(element.styles).forEach(([style, value]) => {el.style[style] = value;});
    if (element.tag.includes('BHV')) {el.addEventListener('mouseover', () => {
      el.style.transition = 'border-color 1s, transform 0.7s'; el.style.transform = 'scale(0.97)'; el.style.border = '0.150rem solid rgba(255, 255, 255, 1)';});
  
    el.addEventListener('mouseout', () => {el.style.transition = 'border-color 1s, transform 0.7s'; el.style.transform = 'scale(1)'; el.style.border = element.styles.border;});}
      else if (element.tag.includes('RHV')) {
        el.addEventListener('mouseover', () => {el.style.transition = 'background 0.5s'; el.style.borderRadius = '1.1rem';});
  
    el.addEventListener('mouseout', () => {el.style.transition = 'background 0.5s'; el.style.borderRadius = element.styles.borderRadius;});}};