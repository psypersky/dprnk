import axios from 'axios';

function sendSignupRequest({ state, output }) {
  const formCursor = state.select(['auth', 'signup', 'form']);

  const email = formCursor.get(['email', 'value']);
  const password = formCursor.get(['password', 'value']);

  axios.post('/api/auth/signup/email', { email, password })
    .then((response) => {
      output.success({ success: response.data });
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        output.conflict({ conflict: error.response.data });
        return;
      }

      output.error({ error });
    });
}

sendSignupRequest.async = true;
sendSignupRequest.outputs = ['success', 'conflict', 'error'];

export default sendSignupRequest;
