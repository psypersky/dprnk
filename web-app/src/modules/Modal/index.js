import {
  hideModal,
} from './chains';

export default modal => {
  modal.addSignals({
    backgroundClicked: hideModal,
  });
};
