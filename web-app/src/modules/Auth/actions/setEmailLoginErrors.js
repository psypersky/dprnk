
export default function setEmailLoginErrors({ state, input }) {
  state.set(['auth', 'login', 'formErrors'], input);
}
