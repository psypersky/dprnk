

function submitShotLike({ input, output, services: { http } }) {
  const formValues = {
    shotId: input.shotId,
    shotUrl: input.shotUrl,
    liked: !input.liked,
  };

  http.post('/api/shots/like-set', formValues)
    .then(output.success)
    .catch(output.error);
}

submitShotLike.async = true;
submitShotLike.ouputs = ['success', 'error'];

export default submitShotLike;
