import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'Components/Header';
import Home from 'Pages/Home';
import Event from 'Pages/Event';
import Auth from 'Pages/Auth/Auth';

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
