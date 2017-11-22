import axios from 'axios';

const debug = require('debug')('app:account:actions:sendProfileForm');

function sendProfileForm({ state, output }) {
  const form = state.get('account.settingsForm');

  const profile = {
    username: form.username.value,
    location: form.location.value,
    bio: form.bio.value,
    websiteUrl: form.websiteUrl.value,
    facebookUrl: form.facebookUrl.value,
    twitterUrl: form.twitterUrl.value,
    availableForPainting: form.availableForPainting.value,
    showEmail: form.showEmail.value,
  };

  debug('sending user profile form');
  axios.post('/api/account/edit-profile', profile)
    .then(() => {
      debug('success editing profile');
      output.success({ profile });
    })
    .catch((e) => {
      if (e.response.status === 409) {
        debug('got conflict editing profile', e.response.data.errors);
        output.conflict({ errors: e.response.data });
        return;
      }
      debug('error editing profile', e.response);
      output.error(e.response);
    });
}

sendProfileForm.async = true;
sendProfileForm.outputs = ['success', 'conflict', 'error'];

export default sendProfileForm;
