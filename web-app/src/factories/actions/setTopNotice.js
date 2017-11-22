
export default function setTopNoticeFactory({ message, type }) {
  return function setTopNotice({ state }) {
    state.set('topNotice', { message, type });
  };
}
