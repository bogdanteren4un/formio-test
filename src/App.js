import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Form from './pages/Form';
import Event from './pages/Event';
import Auth from './pages/Auth/Auth';
import { AppConfig } from './config';

const App = () => (
  <div>
    <Header />

    <div className="container" id="main">
      {AppConfig.projectUrl === 'https://reactstarter.form.io' ? (
        <div className="alert alert-warning">
          This app is still configured to use the default project. Be sure to
          create your own project in form.io and change the PROJECT_URL in
          src/config.js
        </div>
      ) : null}
      <Route exact path="/" component={Home} />
      <Route path="/form" component={Form} />
      <Route path="/event" component={Event} />
      <Route path="/auth" component={Auth} />
    </div>
  </div>
);

export default App;
