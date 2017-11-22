
const debug = require('debug')('app:shots:loadShot');

function loadShot({ input, output, services: { http }, state }) {
  const shot = state.get(`shotPage.shots.${input.shotUrl}`);

  if (shot) {
    output.success({ shots: {} });
    return;
  }

  http.post('/api/shots/load-shot', { url: input.shotUrl })
    .then(({ result: shotRes }) => {
      debug('got shot', shotRes);
      output.success({ shots: { [shotRes.url]: shotRes } });
    })
    .catch(output.error);
}

loadShot.async = true;
loadShot.ouputs = ['success', 'error'];

export default loadShot;
