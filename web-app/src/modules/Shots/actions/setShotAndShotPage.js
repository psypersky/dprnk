import setPage from '../../../factories/actions/setPage';

export default function setShotAndShotPage({ input, state }) {
  const shot = input.success;
  console.log('shot shot', shot);
  state.set(`shotPage.shots.${shot.id}`, shot);
  setPage(`/shots/${shot.url}`)({ state, input });
}
