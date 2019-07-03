let store;

export const setStore = newStore => (store = newStore);

export const getState = () => (store && store.getState()) || {};

export const dispatch = action => (store && store.dispatch(action)) || undefined;

export default {
  setStore,
  getState,
  dispatch
};
