import { set } from 'cerebral/operators';

export default [
  set('state:uploadImageComponent.uploading', true),
  set('state:uploadImageComponent.hasError', false),
  set('state:uploadImageComponent.errors', {}),
];
