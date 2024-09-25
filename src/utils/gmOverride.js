import {overrides} from '../arrays/overrides';

export const gmOverride = () => {
  const createPattern = (url) => {
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(escapedUrl);};

  const originalFetch = unsafeWindow.fetch; unsafeWindow.fetch = async (url, options) => {
    for (const override of overrides) {
      const pattern = createPattern(override.from);
        if (pattern.test(url)) {console.log(`[Blurstyle] успешная замена ресурса: \nкаво: ${url}\nкуда: ${override.to}`);
          return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({method: 'GET', url: override.to, responseType: 'blob',
              onload: response => {
                if (response.status === 200) {
                  resolve(new Response(response.response, {status: 200, statusText: 'OK', headers: {'Content-Type': response.response.type}}));}
                    else {reject(new Error(`${response.status}`));}}, onerror: reject});});}}
                      return originalFetch(url, options);};};