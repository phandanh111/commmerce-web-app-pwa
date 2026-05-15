import React from 'react';
import { Empty } from 'antd';
import styles from './styles.module.scss';

const NewsContainer: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.hero}><h1>Tin tức</h1><p>Cập nhật mới nhất từ Vương Gia Yến</p></div>
    <div className={styles.container}><Empty description="Đang cập nhật tin tức..." /></div>
  </div>
);

export default React.memo(NewsContainer);
