
export default function setTwitterToken({ input, state }) {
  state.set(['auth', 'signup', 'twitterToken'], input.token);
}
