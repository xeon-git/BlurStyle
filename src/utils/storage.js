export const saveToLocalStorage = (key, value) => {
  try {
    const handlers = {'boolean': (val) => val.toString(), 'number': (val) => val.toString(), 'object': (val) => JSON.stringify(val), 'default': (val) => String(val)};
    const type = typeof value;
    const handler = handlers[type] || handlers.default; localStorage.setItem(key, handler(value));}
      catch (error) {}};

export const getFromLocalStorage = (key, defaultValue) => {
  try {
    const savedValue = localStorage.getItem(key);
      if (savedValue === null) return defaultValue;
    
    const type = typeof defaultValue;
      if (type === 'boolean') return savedValue === 'true';
      if (type === 'number') {
        const parsedNum = parseFloat(savedValue);
          return isNaN(parsedNum) ? defaultValue : parsedNum;}
      if (type === 'object') {
        try {return JSON.parse(savedValue);} catch {return defaultValue;}}
          return savedValue;}
            catch (error) {return defaultValue;}};

export const removeFromLocalStorage = (key) => {
  try {localStorage.removeItem(key);} catch (error) {}};

export const getAllKeysStartingWith = (prefix) => {
  const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) keys.push(key);}
          return keys;
};