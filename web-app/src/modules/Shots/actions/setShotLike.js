
export default function setShotLike({ input, state }) {
  const pageShot = state.get(`shotPage.shots.${input.shotUrl}`);

  if (pageShot) {
    state.set(`shotPage.shots.${input.shotUrl}.liked`, !input.liked);

    let pageShotLikesCount =
      state.get(`shotPage.shots.${input.shotUrl}.likes_count`);

    if (input.liked) {
      pageShotLikesCount--;
    } else {
      pageShotLikesCount++;
    }
    state.set(`shotPage.shots.${input.shotUrl}.likes_count`,
      pageShotLikesCount);
  }

  const galleryShot = state.get(`gallery.shots.${input.shotUrl}`);

  if (galleryShot) {
    state.set(`gallery.shots.${input.shotUrl}.liked`, !input.liked);

    let galleryShotLikesCount =
      state.get(`gallery.shots.${input.shotUrl}.likes_count`);
    if (input.liked) {
      galleryShotLikesCount--;
    } else {
      galleryShotLikesCount++;
    }
    state.set(`gallery.shots.${input.shotUrl}.likes_count`,
      galleryShotLikesCount);
  }
}
