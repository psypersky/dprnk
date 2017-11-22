export default function setTopNoticeFromErrorFactory() {
  return function setTopNoticeFromError({ state, input }) {
    console.log('setting top notice',{ message: input.error, type: 'error' } );
    state.set('topNotice', { message: input.error, type: 'error' });
  };
}
