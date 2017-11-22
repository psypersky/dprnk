
export default function setSignupOauthConfirmErrors({ state, input }) {
  state.set(['auth', 'signup', 'setupAccountFormErrors'], input.errors);
}
