
export default function redirectToSignalFactory(signal, input) {
  return function redirectToSignal({ services, state }) {
    state.set('modal.backgroundPage', '');
    state.set('modal.page', '');
    state.set('modal.show', false);
    services.router.redirectToSignal(signal, input);
  };
}
