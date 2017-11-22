import {
  submitEmailLoginForm,
  clearEmailLoginEmailPasswordError,
  submitEmailSignupForm,
  clearEmailSignupTaken,
  submitSetupAccountForm,
  submitEmailConfirmForm,
  requestTwitterToken,
  submitOauthSignup,
  submitOauthLoginAuthentication,
  submitResetPasswordForm,
  submitNewPasswordForm,
  signOut,
} from './chains';

import {
  setPage,
  setModalPage,
} from '../../factories/chains';

export default (module) => {
  // WARNING: Do not set state here, use app/initialState

  module.addSignals({
    loginClicked: setModalPage('login'),
    signupClicked: setModalPage('signup'),

    setSignupSetupAccountPage: setPage('signup/setup-account'),
    setSignupUnverifiedPage: setPage('signup/unverified'),
    setSignupConfirmEmailPage: setPage('signup/confirm-email'),
    setSignupConfirmOauthPage: setPage('signup/confirm-oauth'),

    // Password reset
    setPasswordResetsNewPage: setPage('password-resets/new'),
    setPasswordResetsSentPage: setPage('password-resets/sent'),
    setPasswordResetEditPage: setPage('password-resets/edit'),
    resetPasswordFormSubmited: submitResetPasswordForm,
    setNewPasswordFormSubmited: submitNewPasswordForm,

    // Login
    emailLoginFormSubmited: submitEmailLoginForm,
    emailLoginClearEmailPasswordError: clearEmailLoginEmailPasswordError,

    // Oauth Login
    oauthLoginSubmited: {
      chain: submitOauthLoginAuthentication,
      immediate: true,
    },

    // Signup Email
    emailSignupFormSubmited: submitEmailSignupForm,
    emailSignupClearTakenError: clearEmailSignupTaken,

    // Signup Oauth
    twitterTokenRequested: requestTwitterToken,
    oauthSignupSubmited: {
      chain: submitOauthSignup,
      immediate: true,
    },

    // Setup Account
    setupAccountFormSubmited: submitSetupAccountForm,

    // Confirm email register
    emailConfirmFormSubmited: submitEmailConfirmForm,

    // Signout
    signOutClicked: signOut,

  });
};
