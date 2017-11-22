
export default function setFormConflictErrorsFactory(inputRoute, stateRoute) {
  return function setFormConflictErrors({ state, input }) {
    state.set(stateRoute, input[inputRoute]);
  };
}
