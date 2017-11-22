import { submitShotLike, setShotLike } from '../actions';
import {
  redirect,
} from '../../../factories/actions';

export default [
  submitShotLike,
  {
    success: [
      setShotLike,
    ],
    error: [
      redirect('/error'),
    ],
  },
];
