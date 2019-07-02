import axios from 'axios';
import Types from '../types';

const baseUrl = 'http://domen.com';

const middleware = store => next => async action => {
  await next(action);

  if (action.type === Types.API_REQUEST && action.meta) {
    const { method, url, onSuccess, onError } = action.meta;
    const fullUrl = baseUrl + url;

    try {
      let result = null;
      if (method === 'get') {
        result = await axios.get(fullUrl);
      } else if (method === 'post') {
        result = await axios.post(fullUrl, action.payload);
      }

      if (result) {
        await store.dispatch({
          type: onSuccess,
          payload: result.data,
        });
      }
    } catch (error) {
      await store.dispatch({
        type: onError,
        payload: error.message,
      });
    }
  }
};

export default middleware;
