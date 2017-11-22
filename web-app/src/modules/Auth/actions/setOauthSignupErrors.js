
export default function setOauthRegisterErrors({ state, input: { conflict } }) {
  state.set(['auth', 'signup', 'formErrors'], conflict);
}
