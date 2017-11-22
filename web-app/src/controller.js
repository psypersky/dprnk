import { Controller } from 'cerebral';
// import Model from 'cerebral/models/immutable';
import Devtools from 'cerebral/devtools';
// import Forms from 'cerebral-module-forms';
// import Http from 'cerebral-module-http';
import debug from 'debug';
// import AuthModule from './modules/Auth';
// import AccountModule from './modules/Account';
// import ShotsModule from './modules/Shots';
// import ModalModule from './modules/Modal';
// import GalleryModule from './modules/Gallery';

// import router from './router';
// import {
//   setPage,
//   setState,
// } from './factories/chains';

window.clientDebug = debug;

// TODO: Hydrate state


// controller.addSignals({
//   setErrorPage: setPage('error'),
//   setNotFoundPage: setPage('notFound'),
//   stateChanged: {
//     chain: setState,
//     immediate: true,
//   },
// });
//
// controller.addModules({
//   gallery: GalleryModule,
//   auth: AuthModule,
//   account: AccountModule,
//   shots: ShotsModule,
//   modal: ModalModule,
//   forms: new Forms({}),
//   http: new Http({}),
//   devtools: new Devtools(),
//   router,
// });

function createAppController({ state }) {
  return new Controller({ state });
}

export default createAppController;
