import React from 'react';
import styles from './styles.scss';

export default function ResetSent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2>New password sent to your email!.</h2>
        <p>
          If you have an account with that email, you should receive an
          email shortly with your shiny new password.
          <br />
          You’re welcome to change it in your account settings afterwards.
        </p>
        <div className={styles.envelopeContainer}>
          <img
            src="/public/assets/Envelope.svg"
            alt="Envelope"
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <a href="/">Back</a>
      </div>
    </div>
  );
}
