var PROJECT_URL = 'https://bhtugrzkcspdujs.form.io';
var API_URL = 'https://api.form.io';

var query = {};
window.location.search
  .substr(1)
  .split('&')
  .forEach(function(item) {
    console.log(item);
    query[item.split('=')[0]] =
      item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
  });

PROJECT_URL = query.projectUrl || PROJECT_URL;
API_URL = query.apiUrl || API_URL;

export const AppConfig = {
  projectUrl: PROJECT_URL,
  apiUrl: API_URL,
};

export const AuthConfig = {
  anonState: '/auth',
  authState: '/',
  login: {
    form: 'admin/login',
  },
  register: {
    form: 'user/register',
  },
};
