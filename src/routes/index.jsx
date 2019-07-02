import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Header from 'Components/Header';
import Home from 'Pages/Home';
import Event from 'Pages/Event';
import Auth from 'Pages/Auth/Auth';
import NotFoundPage from 'Pages/NotFoundPage';

class AppRouter extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/event" component={Event} />
              <Route path="/auth" component={Auth} />
              <Route path="/not-found" component={NotFoundPage} />
              <Redirect to="/not-found" />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect()(AppRouter);
