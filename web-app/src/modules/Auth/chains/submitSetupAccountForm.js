import redirect from '../../../factories/actions/redirect';

import {
  sendSetupAccountForm,
  setSignedUser,
  setSetupAccountErrors,
} from '../actions';

export default [
  sendSetupAccountForm,
  {
    success: [
      setSignedUser,
      redirect('/'),
    ],
    conflict: [
      setSetupAccountErrors,
    ],
    error: [
      redirect('/error'),
    ],
  },
];
