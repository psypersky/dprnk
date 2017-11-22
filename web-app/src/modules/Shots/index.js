import {
  startShotImgSubmit,
  submitShotImg,
  setImgSubmitError,
  startShotAttachmentsSubmit,
  submitShotAttachments,
  setShotAttachmentsSubmitError,
  shotSubmited,
  setShotPage,
  submitShotLike,
} from './chains';

import {
  setPage,
} from '../../factories/chains';

export default (module) => {
  module.addSignals({
    // WARNING: Do not set state here, use app/initialState

    setShotPage,

    setShotsNewPage: setPage('shots/new'),
    shotImgSubmitStarted: startShotImgSubmit,
    shotImgSubmited: submitShotImg,
    shotImgSubmitFailed: setImgSubmitError,
    shotAttachmentsSubmitStarted: startShotAttachmentsSubmit,
    shotAttachmentsSubmited: submitShotAttachments,
    shotAttachmentsFailed: setShotAttachmentsSubmitError,
    shotSubmited,

    // Shot Page
    shotLikeClicked: submitShotLike,
  });
};
