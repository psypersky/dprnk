
export default function clearFormErrors({ state }) {
  if (Object.keys(state.get(['auth', 'signup', 'formErrors'])).length) {
    state.set(['auth', 'signup', 'formErrors'], {});
  }
}
