import { copy, set } from 'cerebral/operators';

export default [
  copy('input:result.imgName', 'state:shots.newShot.form.shotImg.value'),
  set('state:shots.newShot.form.shotImgUploading.value', false),
];
