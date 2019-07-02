import { auth, form, forms, submission, submissions } from 'react-formio';
import { combineReducers } from 'redux';

const formReducer = combineReducers({
  auth: auth(),
  form: form({ name: 'form' }),
  forms: forms({ name: 'forms', query: { type: 'form', tags: 'common' } }),
  submission: submission({ name: 'submission' }),
  submissions: submissions({ name: 'submissions' }),
});

export default formReducer;
