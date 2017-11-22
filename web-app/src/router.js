import Router from 'cerebral-module-router';

export default new Router({
  '/': 'gallery.setHomePage',

  '/login': 'auth.loginClicked',
  '/signup': 'auth.signupClicked',
  '/signup/setup-account': 'auth.setSignupSetupAccountPage',
  '/signup/unverified': 'auth.setSignupUnverifiedPage',
  '/signup/confirm-email': 'auth.setSignupConfirmEmailPage',
  '/signup/confirm-oauth': 'auth.setSignupConfirmOauthPage',
  '/password-resets/new': 'auth.setPasswordResetsNewPage',
  '/password-resets/sent': 'auth.setPasswordResetsSentPage',
  '/password-resets/edit/:email/:token': 'auth.setPasswordResetEditPage',

  '/account': 'account.setAccountPage',

  '/shots/shot/:shotUrl': 'shots.setShotPage',
  '/shots/new': 'shots.setShotsNewPage',

  '/error': 'setErrorPage',
  '/*': 'setNotFoundPage',
});
