
const debug = require('debug')('app:shots:loadGallery');

function loadGalleryFactory({ skip, offset, noFilters }) {
  function loadGallery({ output, services: { http }, state }) {
    const shots = state.get(`gallery.shots`);

    if (skip && Object.keys(shots).length) {
      debug('already have shots', shots);
      output.success();
      return;
    }

    const filters = {};
    if (!noFilters) {
      const formFilters = state.get('gallery.filters');
      filters.gameId = formFilters.gameId.value;
      filters.armyId = formFilters.armyId.value;
      filters.time = formFilters.time.value;
      filters.sort = formFilters.sort.value;

      if (offset) {
        filters.offset = state.get('gallery.shotsOrder').length;
      }
    }

    http.post('/api/gallery/load-shots', filters)
      .then(({ result: galleryState }) => {
        debug('got gallery state', galleryState);
        output.success({ galleryState });
      })
      .catch(output.error);
  }

  loadGallery.async = true;
  loadGallery.ouputs = ['success', 'error'];

  return loadGallery;
}

export default loadGalleryFactory;
