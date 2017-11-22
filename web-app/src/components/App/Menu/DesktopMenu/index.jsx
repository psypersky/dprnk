import React from 'react';
import cx from 'classnames';
import { connect } from 'cerebral-view-react';
import SearchBar from './SearchBar';
import styles from './styles.scss';
// import UserMenu from './UserMenu';
import formStyles from '../../../../styles/formStyles';

export default connect({
  user: 'user',
}, {
  loginClicked: 'auth.loginClicked',
  signupClicked: 'auth.signupClicked',
  setAccountPage: 'account.setAccountPage',
  setShotsNewPage: 'shots.setShotsNewPage',
}, function Menu(props) {
  const {
    user,
    className: parentClassName,
    loginClicked,
    signupClicked,
    setAccountPage,
    setShotsNewPage,
  } = props;

  const handleLoginClick = () => loginClicked();
  const handleSignupClick = () => signupClicked();
  const handleAccountClick = () => setAccountPage();
  const handleUploadClick = () => setShotsNewPage();

  return (
    <div className={cx(parentClassName, styles.wrapper)}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <a href="/">
            <img alt="Ruby Lens logo" src="/public/logo/logo-text-white.svg" />
          </a>
        </div>
        <SearchBar />

        {/** Logged-out Menu **/}
        { user ? null :
        <div className={styles.loggedOutWrapper}>
          <button
            className={cx(formStyles.button, styles.createAccountButton)}
            onClick={handleSignupClick}
          >
            Create Account
          </button>
          <button
            className={cx(formStyles.buttonRed, styles.signInButton)}
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        </div>
        }

        {/** Logged-in Menu **/}
        { !user ? null :
        <div className={styles.loggedInWrapper}>
          <button
            className={cx(formStyles.buttonRed, styles.uploadButton)}
            onClick={handleUploadClick}
          >
            + Upload a photo
          </button>
          <button
            className={styles.profileButton}
            onClick={handleAccountClick}
          >
            {user.username}
          </button>
        </div>
        }
        {/**
        <ul className={styles.nav}>
          <li><a href="/">Home</a></li>
          <li><a href="/inspiration">Inspiration</a></li>
          <li><a href="/competitions">Competitions</a></li>
          <li><a href="/hire a painter">Hire a painter</a></li>
          { user
            ? [<li className={styles.profile} key="m1"><UserMenu /></li>,
              <li className={styles.upload} key="m2">
                <a
                  className={formStyles.button}
                  href="/shots/new"
                >Post a photo</a>
              </li>]
            : null }
          { !user
            ? [
              <li key="mn-1"><a href="/signup">Join</a></li>,
              <li key="mn-2"><a href="/login">Sign In</a></li>,
            ]
            : null
          }
        </ul>
        **/}
      </div>
    </div>
  );
});
