import { set, copy } from 'cerebral/operators';
import { searchGallery } from '../factories';
import { redirect } from '../../../factories/actions';

export default [
  set('state:gallery.textSearchMode', true),
  set('state:gallery.loading', true),
  redirect('/'),
  searchGallery({ offset: false }), {
    success: [
      copy('input:galleryState.shots', 'state:gallery.shots'),
      copy('input:galleryState.shotsOrder', 'state:gallery.shotsOrder'),
      set('state:gallery.loading', false),
      set('state:gallery.searchBar.mode', 'token'),
    ],
    empty: [
      set('state:gallery.loading', false),
    ],
    error: [
      set('state:gallery.loading', false),
      set('state:gallery.searchBar.mode', 'token'),
      redirect('/error'),
    ],
  },
];
