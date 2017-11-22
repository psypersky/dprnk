import { set } from 'cerebral/operators';
import sendDeleteAccount from '../actions/sendDeleteAccount';
import setPage from '../../../factories/actions/setPage';
import redirect from '../../../factories/actions/redirect';

export default [
  sendDeleteAccount,
  {
    success: [
      set('state:user', null),
      redirect('/'),
    ],
    error: [
      setPage('/eror'),
    ],
  },
];
