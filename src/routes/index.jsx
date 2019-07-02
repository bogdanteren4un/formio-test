import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Header from 'Components/Header';
import Home from 'Pages/Home';
import Event from 'Pages/Event';
import Auth from 'Pages/Auth/Auth';
import NotFoundPage from 'Pages/NotFoundPage';

const AppRouter = props => {
  return (
    <div>
      <Header />
      <div className='container' id='main'>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/event' component={Event} />
            <Route path='/auth' component={Auth} />
            <Route path='/not-found' component={NotFoundPage} />
            <Redirect to='/not-found' />
          </Switch>
        </ScrollToTop>
      </div>
    </div>
  );
};

export default AppRouter;
