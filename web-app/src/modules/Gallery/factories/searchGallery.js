
const debug = require('debug')('app:shots:searchGallery');

function searchGalleryFactory({ offset }) {
  function searchGallery({ output, services: { http }, state }) {
    if (!state.get('gallery.searchBar.value').trim()) {
      state.set('gallery.searchBar.value', '');
      output.empty();
      return;
    }

    const filters = {
      textSearch: state.get('gallery.searchBar.value'),
    };

    if (offset) {
      filters.offset = state.get('gallery.shotsOrder').length;
    }

    http.post('/api/gallery/load-shots', filters)
      .then(({ result: galleryState }) => {
        debug('got gallery state', galleryState);
        output.success({ galleryState });
      })
      .catch(output.error);
  }

  searchGallery.async = true;
  searchGallery.ouputs = ['success', 'error', 'empty'];

  return searchGallery;
}

export default searchGalleryFactory;
