export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export const showToast = (message) => ({
  type: SHOW_TOAST,
  payload: message,
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});
