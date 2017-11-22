import { copy, set } from 'cerebral/operators';

export default [
  copy('input:result.images', 'state:shots.newShot.form.attachmentImgs.value'),
  function (context) {
    console.log(context);
  },
  set('state:shots.newShot.uploadingShot', false),
];
