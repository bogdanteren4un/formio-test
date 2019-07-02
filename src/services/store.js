let store;

export const setStore = newStore => (store = newStore);

export const getState = () => {
  return (store && store.getState()) || {};
};

export const dispatch = action => {
  return (store && store.dispatch(action)) || undefined;
};

export default {
  setStore,
  getState,
  dispatch,
};
