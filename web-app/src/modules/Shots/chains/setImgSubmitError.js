import { set } from 'cerebral/operators';
import { setTopNotice } from '../../../factories/actions';

export default [
  set('state:shots.newShot.form.shotImgUploading.value', false),
  setTopNotice({
    type: 'error',
    message: 'Error uploading image, please Try Again.',
  }),
];
