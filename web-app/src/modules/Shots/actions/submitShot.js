
function submitShot({ output, services: { http }, state }) {
  const form = state.get('shots.newShot.form');

  const formValues = {
    shotImg: form.shotImg.value,
    attachmentsImgs: form.attachmentsImgs.value,
    title: form.title.value,
    game: form.game.value,
    army: form.army.value,
    description: form.description.value,
  };

  http.post('/api/shots/save-shot', formValues)
    .then(output.success)
    .catch(output.error);
}

submitShot.async = true;
submitShot.ouputs = ['success', 'error'];

export default submitShot;
