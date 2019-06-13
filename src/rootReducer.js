import { combineReducers } from 'redux'
import { auth, form, forms, submission, submissions } from 'react-formio';

export default combineReducers({
  auth: auth(),
  form: form({name: 'form'}),
  forms: forms({ name: 'forms', query: {type: 'form', tags: 'common'}}),
  submission: submission({name: 'submission'}),
  submissions: submissions({name: 'submissions'}),
  event: combineReducers({
    form: form({ name: 'event'}),
    submission: submission({name: 'event'}),
    submissions: submissions({name: 'event'}),
  }),
  demographics: combineReducers({
    form: form({ name: 'demographics'}),
    submission: submission({name: 'demographics'}),
    submissions: submissions({name: 'demographics'}),
  })
})
