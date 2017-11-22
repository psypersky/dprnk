import React from 'react'
// import classNames from 'classnames';
import { state, signal } from 'cerebral/tags'
import { connect } from '@cerebral/react'
// import LoginPage from './Pages/Login';
// import SignupPage from './Pages/Signup/Signup';
// import SignupSetupAccountPage from './Pages/Signup/SetupAccount';
// import SignupConfirmEmailPage from './Pages/Signup/ConfirmEmail';
// import SignupUnverifiedPage from './Pages/Signup/Unverified';
// import SignupFollowPainters from './Pages/Signup/FollowPainters';
// import ErrorPage from './Pages/Error';
// import GalleryPage from './Pages/Gallery';
// import NewShotPage from './Pages/Shots/NewShot';
// import ShotPage from './Pages/Shots/ShotPage';
// import NotFoundPage from './Pages/NotFound';
// import AccountPage from './Pages/Account';
// import ResetPasswordPage from './Pages/PasswordResets/ResetPassword';
// import SetNewPasswordPage from './Pages/PasswordResets/SetNewPasswordPage';
// import ResetPasswordSentPage from './Pages/PasswordResets/ResetSent';
// import Menu from './Menu';
// import Modal from './Modal';
// import styles from './styles.scss';

const debug = require('debug')('app:App')

// const pages = {
//   login: LoginPage,
//   signup: SignupPage,
//   'signup/setup-account': SignupSetupAccountPage,
//   'signup/confirm-email': SignupConfirmEmailPage,
//   'signup/unverified': SignupUnverifiedPage,
//   'signup/follow-painters': SignupFollowPainters,
//   gallery: GalleryPage,
//   error: ErrorPage,
//   notFound: NotFoundPage,
//   account: AccountPage,
//   'shots/new': NewShotPage,
//   'shots/shot': ShotPage,
//   'password-resets/new': ResetPasswordPage,
//   'password-resets/edit': SetNewPasswordPage,
//   'password-resets/sent': ResetPasswordSentPage,
// };

export default connect(
  {
    // currentPage: 'currentPage',
    // currentQuery: 'currentQuery',
    // modal: 'modal',
    // topNotice: 'topNotice',
    testData: state`testData`
  },
  function App({ testData }) {
    return (
      <div>
        <div>This is the App</div>
        <div>Hello there</div>
        <div>{testData}</div>
      </div>
    )

    // const { modal, topNotice, currentPage, currentQuery } = props;
    //
    // let Page = pages[modal.show ? modal.backgroundPage : currentPage];
    //
    // debug('currentPage', currentPage);
    //
    // if (!Page) {
    //   debug('[Error] trying to render a null page, rendering not found');
    //   Page = pages.error;
    // }
    //
    // const showMenu = (
    //   currentPage !== 'signup/setup-account' &&
    //   currentPage !== 'signup/confirm-email' &&
    //   currentPage !== 'signup/unverified'
    // );
    //
    // const hidePageOnMobile = modal.show;
    //
    // if (modal.show) {
    //   debug('rendering modal', modal.page);
    //   debug('with background page', modal.backgroundPage);
    // } else {
    //   debug('redering page', currentPage);
    // }
    //
    // return (
    //   <div className={styles.app}>
    //     { showMenu ? <Menu /> : null}
    //     { topNotice
    //       ? <div
    //         className={classNames(
    //           styles.topNotice, {
    //             [styles.sucess]: topNotice.type === 'success',
    //             [styles.error]: topNotice.type === 'error',
    //           })}
    //       >
    //         <h1>{ topNotice.message }</h1>
    //       </div>
    //       : null
    //     }
    //     { modal.show ? <Modal /> : null }
    //     <div className={hidePageOnMobile ? styles.hidePageOnMobile : null}>
    //       <Page currentQuery={currentQuery} />
    //     </div>
    //   </div>
    // );
  }
)
