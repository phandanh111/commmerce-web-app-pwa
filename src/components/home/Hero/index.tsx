import React from 'react';
import { PhoneFilled, DownOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

function Hero({ className }: Props) {
  return (
    <div className={`${styles.heroWrapper} ${className || ''}`}>
      <div className={styles.searchRow}>
        <div className={styles.searchBar}>
          <div className={styles.category}>
            All Categories <DownOutlined className={styles.dropdownIcon} />
          </div>
          <input type="text" placeholder="What do you need?" />
          <button type="button">SEARCH</button>
        </div>

        <div className={styles.phone}>
          <div className={styles.icon}>
            <PhoneFilled />
          </div>
          <div className={styles.text}>
            <h5>+65 11.188.888</h5>
            <span>support 24/7 time</span>
          </div>
        </div>
      </div>

      <img
        src="/banner.png"
        alt="Hero Banner"
        className={styles.banner}
      />
    </div>
  );
}

export default React.memo(Hero);
