import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from '../routes';
import configureStore from './store';
import history from 'Services/history';
import { setStore } from '../services/store';

import { initAuth, Formio, Components } from 'react-formio';
import components from './checkMatrix';
import formioUrls from '../env';

import 'Theme/main.scss';

Formio.setProjectUrl(formioUrls.projectUrl);
Formio.setBaseUrl(formioUrls.apiUrl);
Components.setComponents(components);

const { store } = configureStore();

// Initialize the current user
store.dispatch(initAuth());

export default class Setup extends React.Component {
  constructor(props) {
    super(props);
    const { persistor } = configureStore(() =>
      this.setState({ isLoading: false })
    );

    setStore(store);
    this.state = {
      isLoading: false,
      persistor,
      store
    };
  }

  render() {
    return (
      <div className="App">
        <PersistGate loading={null} persistor={this.state.persistor}>
          <Router history={history}>
            <Provider store={this.state.store}>
              <AppRouter />
            </Provider>
          </Router>
        </PersistGate>
      </div>
    );
  }
}
