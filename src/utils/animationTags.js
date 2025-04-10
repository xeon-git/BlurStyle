export const animationTags = (element, el) => {
    const animationMap = {'fade': ['animate', 'fade'], 'scale': ['animate', 'scale'], 'scale3d': ['animate', 'scale3d'], 'slide': ['animate', 'slideIn']};
      Object.keys(animationMap).forEach(tag => {
        if (element.tag.includes(tag)) {el.classList.add(...animationMap[tag]);}});
};