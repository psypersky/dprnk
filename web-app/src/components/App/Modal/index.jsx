import React from 'react';
import { connect } from 'cerebral-view-react';
import styles from './styles.scss';
import LoginPage from '../Pages/Login';
import SignupPage from '../Pages/Signup/Signup';
import ShotsPage from '../Pages/Shots/NewShot';

const pages = {
  login: LoginPage,
  signup: SignupPage,
  shots: ShotsPage,
};

export default connect({
  modal: 'modal',
}, {
  backgroundClicked: 'modal.backgroundClicked',
}, function Modal(props) {
  const { modal, backgroundClicked } = props;

  const Page = pages[modal.page];

  const handleBackgroundClick = () => backgroundClicked();

  return (
    <div
      className={styles.modal}
      onClick={handleBackgroundClick}
    >
      <Page />
    </div>
  );
});
