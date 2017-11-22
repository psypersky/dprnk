import axios from 'axios';

const debug = require('debug')('app:actions:sendOauthCode');

function sendOauthSignup({ input: { oauthCode }, output }) {
  debug('sending oauth code', oauthCode.provider, oauthCode.code);
  axios.post('/api/auth/signup/oauth', {
    provider: oauthCode.provider,
    code: oauthCode.code,
  })
    .then((response) => {
      debug('Sucess sending oauthCode, got response', response);
      output.confirm();
    })
    .catch((e) => {
      if (e.response.status === 409) {
        debug('Conflict sending oauth code', e.response);
        output.conflict({ conflict: e.response.data });
        return;
      }
      debug('Error sending oauthCode', e);
      output.error(e);
    });
}

sendOauthSignup.async = true;
sendOauthSignup.outputs = ['confirm', 'conflict', 'error'];

export default sendOauthSignup;
