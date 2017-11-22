import {
  setGalleryPage,
  reloadShotsWithFilters,
  loadMoreShots,
  setSearchBarInputValue,
  submitSearchBarInput,
  setSearchBarInputMode,
} from './chains';

export default (module) => {
  module.addSignals({
    // WARNING: Do not set state here, use app/initialState

    setHomePage: setGalleryPage,
    filtersChanged: reloadShotsWithFilters,
    nextPageTriggered: loadMoreShots,

    // Search Bar
    searchBarInputChanged: setSearchBarInputValue,
    searchBarInputSubmited: submitSearchBarInput,
    searchBarTokensClicked: setSearchBarInputMode,
  });
};
