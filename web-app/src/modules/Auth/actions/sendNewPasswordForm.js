import axios from 'axios';

const debug = require('debug')('app:modules:auth:sendNewPasswordForm');

function sendNewPasswordForm({ state, output }) {
  const resetData = state.get('auth.resetPassword.resetData');
  const password = state.get('auth.setNewPassword.form.password.value');
  const obj = {
    password,
    email: resetData.email,
    token: resetData.token,
  };

  debug('sending data', obj);

  axios.post('/api/auth/password-resets/edit', obj)
    .then(output.success)
    .catch(output.error);
}

sendNewPasswordForm.async = true;
sendNewPasswordForm.outputs = ['success', 'error'];

export default sendNewPasswordForm;
