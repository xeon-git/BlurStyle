import {styles} from '../arrays/styles';

let observerInitialized = false;

export const initObserver = () => {
  if (observerInitialized) return;

  const observer = new MutationObserver(() => {styles();}); observer.observe(document.body, {childList: true, subtree: true}); observerInitialized = true;};