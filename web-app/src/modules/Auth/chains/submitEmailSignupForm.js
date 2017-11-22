import redirect from '../../../factories/actions/redirect';
import {
  clearFormErrors,
  sendEmailSignupRequest,
  setSignupUser,
  setSignupEmailErrors,
} from '../actions';

export default [
  clearFormErrors,
  sendEmailSignupRequest, {
    success: [
      setSignupUser,
      redirect('/signup/unverified'),
    ],
    conflict: [
      setSignupEmailErrors,
    ],
    error: [
      redirect('/error'),
    ],
  },
];
