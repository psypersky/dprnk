
export default function setSignupUser({ input: { success }, state }) {
  state.merge(['auth', 'signup', 'user'], success.user);
}
