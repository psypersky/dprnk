import { copy, set } from 'cerebral/operators';
import { merge } from 'cerebral-addons';
import setPage from '../../../factories/actions/setPage';
import { loadShot } from '../actions';

module.exports = [
  loadShot,
  {
    success: [
      set('state:currentPage', 'shots/shot'),
      copy('input:shotUrl', 'state:currentQuery'),
      copy('input:shots', merge('state:shotPage.shots')),
    ],
    error: [
      setPage('/error'),
    ],
  },
];
