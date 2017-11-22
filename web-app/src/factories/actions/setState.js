
export default function setState({ state, input }) {
  state.set(input.route, input.value);
}
