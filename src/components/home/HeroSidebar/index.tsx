import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const categories = [
  'Yến Tinh Chế',
  'Yến Thô',
  'Nước Yến',
  'Yến Hũ',
  'Quà Tặng Yến',
  'Yến Vụn',
  'Sản Phẩm Khác'
];

const HeroSidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
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
};

export default React.memo(HeroSidebar);
