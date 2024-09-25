export const saveToLocalStorage = (key, value) => {localStorage.setItem(key, value.toString());};
  
export const getFromLocalStorage = (key, defaultValue) => {
  const savedValue = localStorage.getItem(key);
    return savedValue !== null ? (savedValue === 'true') : defaultValue;};