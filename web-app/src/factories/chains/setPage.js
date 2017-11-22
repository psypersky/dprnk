import setPageActionFactory from '../actions/setPage';

export default function setPageChainFactory(page) {
  return [
    setPageActionFactory(page),
  ];
}
