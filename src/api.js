const DEFAULT_TIMES = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

export const fetchAPI = (date) => {
  if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
    return window.fetchAPI(date);
  }
  return [...DEFAULT_TIMES];
};

export const submitAPI = (formData) => {
  if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
    return window.submitAPI(formData);
  }
  return true;
};
