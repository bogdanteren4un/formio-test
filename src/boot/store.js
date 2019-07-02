import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

import reducer from "Redux/reducers";
import api from "Redux/middlewares/api";

const persistConfig = {
  key: "root",
  storage
};

export default function configureStore(onCompletion) {
  const middlewares = [thunk, api];

  if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const pReducer = persistReducer(persistConfig, reducer);
  const store = createStore(pReducer, enhancer);
  const persistor = persistStore(store, undefined, onCompletion);

  return { store, persistor };
}
