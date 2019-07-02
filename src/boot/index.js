import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store';
import { setStore } from '../services/store';
import store, { history } from './store';
import { initAuth, Formio, Components } from 'react-formio';
import App from '../App';

import components from '../checkMatrix';
import { AppConfig } from '../config';

import '../styles.scss';

Formio.setProjectUrl(AppConfig.projectUrl);
Formio.setBaseUrl(AppConfig.apiUrl);
Components.setComponents(components);

// Initialize the current user
store.dispatch(initAuth());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// export default class Setup extends React.Component {
//   constructor(props) {
//     super(props);
//     const { store, persistor } = configureStore(() =>
//       this.setState({ isLoading: false })
//     );

//     setStore(store);
//     this.state = {
//       isLoading: false,
//       persistor,
//       store,
//     };
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <App />
//         </ConnectedRouter>
//       </Provider>
//     );
//   }
// }
