import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Event from './pages/Event';
import Auth from './pages/Auth/Auth';

const App = () => (
  <div>
    <Header />

    <div className="container" id="main">
      <Route exact path="/" component={Home} />
      <Route path="/event" component={Event} />
      <Route path="/auth" component={Auth} />
    </div>
  </div>
);

export default App;
