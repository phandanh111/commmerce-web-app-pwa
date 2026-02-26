import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const categories = [
  'Yến Tinh Chế',
  'Yến Thô',
  'Nước Yến',
  'Yến Hũ',
  'Quà Tặng Yến',
  'Yến Vụn',
  'Sản Phẩm Khác',
];

function HeroSidebar({ className }: Props) {
  return (
    <div className={`${styles.sidebar} ${className || ''}`}>
      <div className={styles.title}>All Departments</div>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            <Link to={`/shop?category=${cat}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(HeroSidebar);
