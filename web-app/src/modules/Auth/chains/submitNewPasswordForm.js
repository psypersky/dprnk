import { sendNewPasswordForm } from '../actions';

import {
  setPage,
  setTopNotice,
  redirect,
} from '../../../factories/actions';

export default [
  sendNewPasswordForm, {
    success: [
      setPage('home'),
      setTopNotice({
        message: 'Password successfully updated.',
        type: 'success',
      }),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
