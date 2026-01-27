import React from 'react';
import styles from './styles.module.scss';

const Hero: React.FC = () => {
  return (
    <div className={styles.heroWrapper}>
      <img 
        src="/banner.png" 
        alt="Hero Banner" 
      />
    </div>
  );
};

export default React.memo(Hero);
