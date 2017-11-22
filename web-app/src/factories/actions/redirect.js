
export default function redirectFactory(page) {
  return function redirect({ input, services, state }) {
    // Clear Modal State
    state.set('modal.backgroundPage', '');
    state.set('modal.page', '');
    state.set('modal.show', false);
    services.router.redirect(page);
    // Clear top Notice
    state.set('topNotice', null);
    if (input.notice) {
      state.set('topNotice', input.notice);
    }
  };
}
