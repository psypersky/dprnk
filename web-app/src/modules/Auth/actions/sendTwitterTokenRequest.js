import axios from 'axios';

const debug = require('debug')('app:actions:sendTwitterTokenRequest');

function sendTwitterTokenRequest({ output }) {
  axios.get('/api/auth/signup/twitter-token')
    .then((response) => {
      const token = response.data.token;

      debug('Got twitter token', token);

      output.success({ token });
    })
    .catch((e) => {
      output.error(e);
    });
}

sendTwitterTokenRequest.async = true;
sendTwitterTokenRequest.outputs = ['success', 'error'];

export default sendTwitterTokenRequest;
