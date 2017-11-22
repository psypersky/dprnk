import { set, when } from 'cerebral/operators';
import { loadGallery, searchGallery } from '../factories';
import { setMoreShots } from '../actions';
import { redirect } from '../../../factories/actions';

export default [
  set('gallery.loadingMore', true),
  when('state:gallery.textSearchMode'), {
    true: [
      searchGallery({ offset: true }), {
        success: [
          setMoreShots,
          set('gallery.loadingMore', false),
        ],
        error: [
          redirect('/error'),
        ],
      },
    ],
    false: [
      loadGallery({ skip: false, offset: true, noFilters: false }),
      {
        success: [
          setMoreShots,
          set('gallery.loadingMore', false),
        ],
        error: [
          redirect('/error'),
        ],
      },
    ],
  },
];
