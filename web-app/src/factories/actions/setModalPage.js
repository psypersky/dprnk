
export default function setModalPageActionFactory(page, backgroundPage) {
  return function setPage({ state, input }) {
    state.set('topNotice', null);
    if (input.notice) {
      state.set('topNotice', input.notice);
    }
    backgroundPage = backgroundPage || state.get('currentPage');
    state.set('modal.backgroundPage', state.get('currentPage'));
    state.set('modal.page', page);
    state.set('modal.show', true);
  };
}
