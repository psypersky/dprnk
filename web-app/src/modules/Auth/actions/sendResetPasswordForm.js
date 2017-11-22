import axios from 'axios';

function sendResetPasswordForm({ state, output }) {
  const email = state.get('auth.resetPassword.form.email.value');

  axios.post('/api/auth/password-resets/new', { email })
    .then(output.success)
    .catch(output.error);
}

sendResetPasswordForm.async = true;
sendResetPasswordForm.outputs = ['success', 'error'];

export default sendResetPasswordForm;
