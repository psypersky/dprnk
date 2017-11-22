import redirect from '../../../factories/actions/redirect';
import { sendConfirmRequest, setSignedUser } from '../actions';

export default [
  sendConfirmRequest, {
    success: [
      setSignedUser,
      redirect('/'),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
