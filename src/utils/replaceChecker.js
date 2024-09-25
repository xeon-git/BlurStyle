import {replaceImages} from '../arrays/replaceImages';

let observerInitialized = false;

export const replaceChecker = () => {
  if (observerInitialized) return;

  const observer = new MutationObserver(() => {replaceImages();}); observer.observe(document.body, {attributes: true, attributeFilter: ['src'], subtree: true}); observerInitialized = true;};