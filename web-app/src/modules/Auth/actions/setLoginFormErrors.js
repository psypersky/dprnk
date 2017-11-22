
export default function setLoginFormErrors({ state, input }) {
  const errors = input.errors;

  state.set(['auth', 'login', 'formErrors'], errors);
}
