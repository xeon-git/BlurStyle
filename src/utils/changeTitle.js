export const changeTitle = (newTitle) => {
  const currentURL = window.location.href;
  const allowedURLs = ['https://tankionline.com/play/', 'https://.*\\.test-eu\\.tankionline\\.com/browser-public/index\\.html.*',];
  const isAllowedURL = allowedURLs.some((url) => new RegExp(url).test(currentURL));
    if (isAllowedURL && !document.title.includes('BlurStyle')) {document.title = newTitle;}};