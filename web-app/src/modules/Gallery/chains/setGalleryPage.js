import { set, copy, when } from 'cerebral/operators';
import { loadGallery } from '../factories';
import { setPage, redirect } from '../../../factories/actions';

export default [
  setPage('gallery'),
  when('state:gallery.loading'),
  {
    true: [],
    false: [
      set('gallery.loading', true),
      loadGallery({ skip: true, offset: null, noFilters: true }),
      {
        success: [
          set('gallery.loading', false),
          when('input:galleryState'), {
            true: [
              copy('input:galleryState.shots', 'state:gallery.shots'),
              copy('input:galleryState.shotsOrder', 'state:gallery.shotsOrder'),
            ],
            false: [],
          },
        ],
        error: [
          redirect('/error'),
        ],
      },
    ],
  },
];
