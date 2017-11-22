
function sendProfileImageRemove({ services, output }) {
  services.http.post('/api/account/remove-profile-image')
    .then(output.success)
    .catch(output.error);
}
sendProfileImageRemove.async = true;
sendProfileImageRemove.outputs = ['success', 'error'];

export default sendProfileImageRemove;
