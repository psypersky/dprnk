
export default function clearLoginFormErrors({ state }) {
  if (Object.keys(state.get(['auth', 'login', 'formErrors'])).length) {
    state.set(['auth', 'login', 'formErrors'], {});
  }
}
