import React from 'react';
import classNames from 'classnames';
import { connect } from 'cerebral-view-react';
import styles from './styles.scss';
import UserMenu from './UserMenu';
import formStyles from '../../../../styles/formStyles';

export default connect({
  user: 'user',
}, function Menu(props) {
  const { user, className: parentClassName } = props;

  return (
    <div className={classNames(parentClassName, styles.wrapper)}>
      <div className={styles.inner}>
        This is the modafucka mobile menu
      </div>
    </div>
  );
});
