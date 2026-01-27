import React from 'react';
import styles from './styles.module.scss';
import { PhoneFilled, DownOutlined } from '@ant-design/icons';

const Hero: React.FC = () => {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.searchRow}>
        <div className={styles.searchBar}>
            <div className={styles.category}>
                All Categories <DownOutlined style={{ fontSize: 10, marginLeft: 5 }} />
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
        className={styles.banner}
      />
    </div>
  );
};

export default React.memo(Hero);
