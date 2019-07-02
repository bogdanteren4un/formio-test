import { createStore, applyMiddleware, compose } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage';
import reducer from 'Redux/reducers';
import api from 'Redux/middlewares/api';

// const initialState = {};
// const enhancers = [];
// const middleware = [thunk, routerMiddleware(history)];

// if (process.env.NODE_ENV === 'development') {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
//   const { logger } = require('redux-logger');
//   middleware.push(logger);

//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }

// const composedEnhancers = compose(
//   applyMiddleware(...middleware),
//   ...enhancers
// );

// export default createStore(
//   connectRouter(history)(reducer),
//   initialState,
//   composedEnhancers
// );

const persistConfig = {
  key: 'root',
  storage,
};

export default function configureStore(onCompletion) {
  const middlewares = [thunk, api];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
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
