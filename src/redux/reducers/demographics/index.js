import { combineReducers } from 'redux';
import { form, submission, submissions } from 'react-formio';

const demographics = combineReducers({
  form: form({ name: 'demographics' }),
  submission: submission({ name: 'demographics' }),
  submissions: submissions({ name: 'demographics' }),
});

export default demographics;
