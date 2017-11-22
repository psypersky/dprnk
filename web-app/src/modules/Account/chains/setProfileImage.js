import { copy, set } from 'cerebral/operators';

export default [
  copy('input:result.image', 'state:user.image'),
  set('state:uploadImageComponent.uploading', false),
  set('state:uploadImageComponent.hasError', false),
];
