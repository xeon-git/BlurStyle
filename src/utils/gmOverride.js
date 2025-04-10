import {overrides} from '../arrays/overrides';
import {getFromLocalStorage, saveToLocalStorage} from './storage';

export const gmOverride = () => {
  const customResourcesEnabled = getFromLocalStorage('customResourcesEnabled', true);
  const resourcesState = getFromLocalStorage('resourcesState', {});

  const getActiveOverrides = () => {
    if (!customResourcesEnabled) return [];
      return overrides.filter((override, index) => {
        const resourceId = override.id || `resource_${index}`;
          return resourcesState[resourceId] !== false;});};

  const originalFetch = unsafeWindow.fetch; unsafeWindow.fetch = async (url, options) => {
    const activeOverrides = getActiveOverrides();
      for (const override of activeOverrides) {
        const pattern = new RegExp(override.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
          if (pattern.test(url)) {console.log(`[Blurstyle] успешная замена ресурса: \nкаво: ${url}\nкуда: ${override.to}`);
            return new Promise((resolve, reject) => {
              GM_xmlhttpRequest({method: 'GET', url: override.to, responseType: 'blob', onload: response => {
                if (response.status === 200) {
                  resolve(new Response(response.response, {status: 200, statusText: 'OK', headers: {'Content-Type': response.response.type}}));}
                    else {reject(new Error(`${response.status}`));}}, onerror: reject});});}}
                      return originalFetch(url, options);};

  window.toggleResource = (resourceId, enabled) => {
    const currentState = {...getFromLocalStorage('resourcesState', {})}; currentState[resourceId] = enabled; saveToLocalStorage('resourcesState', currentState);};
  window.toggleAllResources = (enabled) => {saveToLocalStorage('customResourcesEnabled', enabled);};
};