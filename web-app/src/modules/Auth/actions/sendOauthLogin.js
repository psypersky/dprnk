import axios from 'axios';

const debug = require('debug')('app:actions:sendOauthLogin');

function sendOauthLogin({ input: { oauthCode }, output }) {
  axios.post('/api/auth/login/oauth', {
    provider: oauthCode.provider,
    code: oauthCode.code,
  })
    .then((response) => {
      debug('Sucess oauth login, got response:', response);
      output.success(response.data);
    })
    .catch((e) => {
      if (e.response.status === 409) {
        debug('Conflict oauth login', e.response);
        output.conflict(e.response.data);
        return;
      }
      debug('Error oauth login', e);
      output.error(e);
    });
}

sendOauthLogin.async = true;
sendOauthLogin.outputs = ['success', 'conflict', 'error'];

export default sendOauthLogin;
