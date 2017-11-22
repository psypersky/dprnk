import axios from 'axios';

function submitSignOut({ output }) {
  axios.post('/api/auth/signout')
    .then(() => {
      output.success();
    })
    .catch(() => {
      output.error();
    });
}

submitSignOut.async = true;
submitSignOut.outputs = ['success', 'error'];

export default submitSignOut;
