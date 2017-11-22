import { submitShot } from '../actions';

import {
  redirect,
} from '../../../factories/actions';

export default [
  submitShot,
  {
    success: [
      redirect('/'),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
