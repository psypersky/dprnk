import axios from 'axios';

const debug = require('debug')('app:account:actions:sendProfileForm');

function sendPasswordForm({ state, output }) {
  const form = state.get('account.passwordForm');

  const password = {
    oldPassword: form.oldPassword.value,
    newPassword: form.newPassword.value,
  };

  axios.post('/api/account/edit-password', password)
    .then(() => {
      debug('success editing password');
      output.success();
    })
    .catch((e) => {
      if (e.response.status === 409) {
        debug('got conflict editing password', e.response.data.errors);
        output.conflict(e.response.data);
        return;
      }
      debug('error editing password', e.response);
      output.error(e.response);
    });
}

sendPasswordForm.async = true;
sendPasswordForm.outputs = ['success', 'conflict', 'error'];

export default sendPasswordForm;
