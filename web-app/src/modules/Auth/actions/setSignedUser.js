
export default function setSignedUser({ state, input }) {
  const user = input.user;

  state.set('user', user);
}

