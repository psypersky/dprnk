import {
  sendResetPasswordForm,
} from '../actions';

import {
  setPage,
} from '../../../factories/actions';

export default [
  sendResetPasswordForm, {
    success: [
      setPage('password-resets/sent'),
    ],
    error: [
      setPage('error'),
    ],
  },
];
