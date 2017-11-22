
export default function setPageActionFactory(page) {
  return function setPage({ state, input }) {
    state.set('topNotice', null);
    if (input.notice) {
      state.set('topNotice', input.notice);
    }
    state.set('modal.backgroundPage', '');
    state.set('modal.page', '');
    state.set('modal.show', false);
    state.set('currentPage', page);
  };
}
