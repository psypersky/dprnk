import redirect from '../../../factories/actions/redirect';
import {
  openOauthPopup,
  sendOauthSignup,
  setOauthSignupErrors,
} from '../actions';

export default [
  openOauthPopup,
  {
    success: [
      sendOauthSignup,
      {
        confirm: [
          redirect('/signup/setup-account'),
        ],
        conflict: [
          setOauthSignupErrors,
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
