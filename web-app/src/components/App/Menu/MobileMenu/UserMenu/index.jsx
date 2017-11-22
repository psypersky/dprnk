import React from 'react';
import { connect } from 'cerebral-view-react';
import styles from './styles';
import UserImage from '../../../../General/UserImage';

export default connect({
  user: 'user',
}, {
  signOutClicked: 'auth.signOutClicked',
}, function UserMenu(props) {
  const { user, signOutClicked } = props;

  return (
    <div className={styles.wrapper}>
      <a href={`/${user.username}`}>
        <UserImage src={user.image} />
      </a>
      <ul className={styles.tabs}>
        <li><a href={`/${user.username}`}>Profile</a></li>
        <li><a href="/account">Account Settings</a></li>
        <li><a onClick={() => signOutClicked()}>Sign Out</a></li>
      </ul>
    </div>
  );
});
