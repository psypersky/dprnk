
export default function setMoreShots({ input, state }) {
  state.merge('gallery.shots', input.galleryState.shots);

  const shotsOrder = state.get('gallery.shotsOrder');
  const moreShotsOder = input.galleryState.shotsOrder;

  const newShotsOrder = shotsOrder.concat(moreShotsOder);
  state.set('gallery.shotsOrder', newShotsOrder);
}
