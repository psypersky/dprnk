import setModalPageActionFactory from '../actions/setModalPage';

export default function setPageModalChainFactory(page) {
  return [
    setModalPageActionFactory(page),
  ];
}
