import redirect from '../../../factories/actions/redirect';
import {
  openOauthPopup,
  sendOauthLogin,
  setSignedUser,
} from '../actions';
import {
  setFormConflictErrors,
} from '../../../factories/actions';

export default [
  openOauthPopup,
  {
    success: [
      sendOauthLogin,
      {
        success: [
          setSignedUser,
          redirect('/'),
        ],
        conflict: [
          // TODO: Set errors and display them on view
          // setFormConflictErrors('auth.login.formErrors'),
        ],
        error: [
          redirect('/error'),
        ],
      },
    ],
    error: [
      redirect('/error'),
    ],
  },
];
