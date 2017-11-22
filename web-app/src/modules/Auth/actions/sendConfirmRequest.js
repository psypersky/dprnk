import axios from 'axios';

const debug = require('debug')('app:action:sendConfirmRequest');

function sendConfirmRequest({ state, output }) {
  const password = state.get([
    'auth', 'signup', 'confirmForm', 'password', 'value']);

  axios.post('/api/auth/signup/confirm-email', { password })
    .then((res) => {
      debug('user confirmed', res);
      output.success({ user: res.data.user });
    })
    .catch((e) => {
      debug('user confirm error', e);
      output.error(e);
    });
}

sendConfirmRequest.async = true;
sendConfirmRequest.outputs = ['success', 'error'];

export default sendConfirmRequest;
