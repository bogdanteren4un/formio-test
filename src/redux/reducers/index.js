import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import formReducers from './formReducers';
import demographics from './demographics/index';

const rootReducer = combineReducers({
  form,
  formReducers,
  demographics,
});

export default rootReducer;
