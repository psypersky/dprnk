import axios from 'axios';

const debug = require('debug')('app:actions:sendEmailLoginRequest');

function sendEmailLoginRequest({ state, output }) {
  const formCursor = state.select(['auth', 'login', 'form']);

  const email = formCursor.get(['email', 'value']);
  const password = formCursor.get(['password', 'value']);

  axios.post('/api/auth/login/email', { email, password })
    .then((response) => {
      debug('login success got', response.data);
      output.success(response.data);
    })
    .catch((e) => {
      if (e.response.status === 409 && e.response.data) {
        debug('login conflict got', e.response.data);
        output.conflict(e.response.data);
        return;
      }
      debug('login error got', e.response.data);
      output.error(e.response.data);
    });
}

sendEmailLoginRequest.async = true;
sendEmailLoginRequest.outputs = ['success', 'conflict', 'error'];

export default sendEmailLoginRequest;
