import { copy, set } from 'cerebral/operators';
import { loadGallery } from '../factories';
import { redirect } from '../../../factories/actions';

export default [
  set('gallery.loading', true),
  loadGallery({ skip: false, offset: null, noFilters: false }),
  {
    success: [
      copy('input:galleryState.shots', 'state:gallery.shots'),
      copy('input:galleryState.shotsOrder', 'state:gallery.shotsOrder'),
      set('gallery.loading', false),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
