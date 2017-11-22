import {
  set,
} from 'cerebral/operators';

import {
  redirectToSignal,
} from '../../../factories/actions';

export default [
  set('state:modal.show', false),
  set('state:modal.page', ''),
  set('state:modal.backgroundPage', ''),
  redirectToSignal('setHomePage'),
];
