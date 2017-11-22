
export default function setSignupEmailErrors({ state, input: { conflict } }) {
  state.set(['auth', 'signup', 'formErrors'], conflict);
}
