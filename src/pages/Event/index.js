import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Create from './Create';

const Form = () => (
  <div>
    <Switch>
      <Route exact path="/event" component={Create} />
    </Switch>
  </div>
);

export default Form;
