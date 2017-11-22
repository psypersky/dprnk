import React from 'react';
import { connect } from 'cerebral-view-react';
import cx from 'classnames';
import styles from './styles';
import formStyles from '../../../../../../styles/formStyles';

export default connect({
}, {
  deleteAccountSubmited: 'account.deleteAccountSubmited',
}, function AccountRootPage(props) {
  const { deleteAccountSubmited } = props;

  const handleClick = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete your account?')) {
      deleteAccountSubmited();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={formStyles.form}>
        <h2>Delete account</h2>
        <p>You sure? That would be heresy.</p>
        <button
          onClick={handleClick}
          className={cx(styles.buttonDelete)}
        />
      </form>
    </div>
  );
});
