import React from 'react';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

function Hero({ className }: Props) {
  return (
    <div className={`${styles.heroWrapper} ${className || ''}`}>
      <img
        src="/banner.png"
        alt="Vương Gia Yến — Ưu đãi đặc biệt"
        className={styles.banner}
      />
    </div>
  );
}

export default React.memo(Hero);
