import React from 'react';
import AccountSettings from './Pages/Settings';
import AccountPasswordPage from './Pages/Password';
import AccountDeletePage from './Pages/DeleteAccount';
import styles from './styles';

export default function AccountPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <AccountSettings />
        <AccountPasswordPage />
        <AccountDeletePage />
      </div>
    </div>
  );
}
