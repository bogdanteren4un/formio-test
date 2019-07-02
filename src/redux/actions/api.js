import Types from '../types';

export default ({ method, url, body, onSuccess, onError }) => ({
  payload: body,
  type: Types.API_REQUEST,
  meta: { method, url, onSuccess, onError },
});
