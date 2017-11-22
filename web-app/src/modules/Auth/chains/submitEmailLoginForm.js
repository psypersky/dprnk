import {
  redirect,
} from '../../../factories/actions';
import {
  clearLoginFormErrors,
  sendEmailLoginRequest,
  setEmailLoginErrors,
  setSignedUser,
} from '../actions';

export default [
  clearLoginFormErrors,
  sendEmailLoginRequest,
  {
    success: [
      setSignedUser,
      redirect('/'),
    ],
    conflict: [
      setEmailLoginErrors,
    ],
    error: [
      redirect('/error'),
    ],
  },
];
