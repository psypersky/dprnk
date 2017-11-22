import React from 'react';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import styles from './styles.scss';

export default function Menu() {
  return (
    <header className={styles.menu}>
      <DesktopMenu className={styles.desktop} />
      <MobileMenu className={styles.mobile} />
    </header>
  );
}
