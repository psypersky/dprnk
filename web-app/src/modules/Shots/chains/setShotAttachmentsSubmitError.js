import { set } from 'cerebral/operators';
import { setTopNotice } from '../../../factories/actions';

export default [
  set('state:shots.newShot.uploadingAttachments', false),
  setTopNotice({
    type: 'error',
    message: 'Error uploading attachments please check they are valid images.',
  }),
];
