export const animationTags = (element, el) => {
    if (element.tag.includes('fade')) {el.classList.add('animate', 'fade');}
    if (element.tag.includes('scale')) {el.classList.add('animate', 'scale');}
    if (element.tag.includes('scale3d')) {el.classList.add('animate', 'scale3d');}
    if (element.tag.includes('slide')) {el.classList.add('animate', 'slideIn');}};