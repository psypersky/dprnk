
function sendDeleteAccount({ output, services: { http } }) {
  http.post('/api/account/delete-account')
    .then(() => {
      output.success();
    })
    .catch(output.error);
}

sendDeleteAccount.async = true;
sendDeleteAccount.ouputs = ['success', 'error'];

export default sendDeleteAccount;
