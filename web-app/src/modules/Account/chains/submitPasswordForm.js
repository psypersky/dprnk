import {
  set,
} from 'cerebral/operators';

import {
  sendPasswordForm,
} from '../actions';

import {
  redirect,
  setTopNotice,
} from '../../../factories/actions';

export default [
  set('state:account.passwordFormErrors', {}),
  sendPasswordForm,
  {
    success: [
      setTopNotice({
        message: 'Your password has been updated.',
        type: 'success',
      }),
      set('state.account.passwordForm.oldPassword', ''),
      set('state.account.passwordForm.newPassword', ''),
    ],
    conflict: [
      setTopNotice({
        message: 'Incorrect Password.',
        type: 'error',
      }),
      set('state.account.passwordForm.oldPassword', ''),
      set('state.account.passwordForm.newPassword', ''),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
