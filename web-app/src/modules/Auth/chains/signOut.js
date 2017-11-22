import redirect from '../../../factories/actions/redirect';
import { sendSignOut, clearUser } from '../actions';

export default [
  sendSignOut, {
    success: [
      clearUser,
      redirect('/'),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
