import { set } from 'cerebral/operators';
import { sendProfileImageRemove } from '../actions';
import {
  setTopNotice,
  redirect,
} from '../../../factories/actions';

export default [
  sendProfileImageRemove, {
    success: [
      set('state:user.image', ''),
      setTopNotice({
        message: 'User avatar removed.',
        type: 'success',
      }),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
