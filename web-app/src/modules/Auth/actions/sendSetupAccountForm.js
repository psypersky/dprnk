import axios from 'axios';

const debug = require('debug')('app:actions:sendSignupOauthConfirm');

function sendSetupAccountForm({ state, output }) {
  const formCursor = state.select(['auth', 'signup', 'setupAccountForm']);

  const username = formCursor.get(['username', 'value']);
  const location = formCursor.get(['location', 'value']);
  const bio = formCursor.get(['bio', 'value']);
  const websiteUrl = formCursor.get(['websiteUrl', 'value']);
  const facebookUrl = formCursor.get(['facebookUrl', 'value']);
  const twitterUrl = formCursor.get(['twitterUrl', 'value']);
  const availableForPainting
    = formCursor.get(['availableForPainting', 'value']);
  const showEmail = formCursor.get(['showEmail', 'value']);

  const data = {
    username,
    location,
    bio,
    websiteUrl,
    facebookUrl,
    twitterUrl,
    availableForPainting,
    showEmail,
  };

  debug('sending form data', data);

  axios.post('/api/auth/signup/setup-account', data)
    .then((response) => {
      debug('oauth confirm success got', response.data);
      output.success({ user: response.data.user });
    })
    .catch((e) => {
      if (e.response && e.response.status === 409) {
        output.conflict({ errors: e.response.data });
        return;
      }
      output.error(e);
    });
}

sendSetupAccountForm.async = true;
sendSetupAccountForm.outputs = ['success', 'conflict', 'error'];

export default sendSetupAccountForm;
