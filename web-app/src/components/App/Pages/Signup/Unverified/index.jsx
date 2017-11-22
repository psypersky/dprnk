import React from 'react';
import { connect } from 'cerebral-view-react';
import styles from './styles.scss';

export default connect({
  signupUser: 'auth.signup.user',
}, (props) => {
  const { signupUser: { email } } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.logo}>
          <a href="/">
            <img
              alt="Ruby Lens logo"
              src="/public/logo/logo-text-white.svg"
            />
          </a>
        </p>
        <img
          alt="Ruby Lens logo"
          className={styles.ogre}
          src="/public/assets/ogres-1.png"
        />
      </div>
      <div className={styles.message}>
        <a href="/">Back</a>
        <span>
          &apos;Ello! Verify your email address.
        </span>
      </div>
      <div className={styles.inner}>
        <div className={styles.confirmationMessage}>
          <h1>We sent a confirmation email to:
            <p>
              <strong id="email-display">{email}</strong>
            </p>
          </h1>
          <h3>Didn’t receive the email? Check your Spam or Trash folder.</h3>
          <h3>
            If you still don’t see it, please email us at
            <a
              href="mailto:support@rubylens.com?Subject=Hello%20again"
              target="_top"
            > support@rubylens.com.</a>
          </h3>
          <p>
            <img
              width="128"
              src="/public/assets/Envelope.svg"
              alt="Icon verify email"
            />
          </p>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <a href="/">Back</a>
      </div>
    </div>
  );
});
