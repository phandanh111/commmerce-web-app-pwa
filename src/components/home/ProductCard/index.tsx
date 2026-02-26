import React from 'react';
import { Card, Button, Rate, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  image: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
};

function ProductCard({ className, image, title, category, price, rating, reviewCount, badge }: Props) {
  return (
    <Card
      hoverable
      className={`${styles.card} ${className || ''}`}
      cover={
        <div className={styles.coverWrapper}>
          {badge && <Tag color="orange" className={styles.badge}>{badge}</Tag>}
          <img alt={title} src={image} />
        </div>
      }
    >
      <div className={styles.category}>{category}</div>
      <div className={styles.title} title={title}>{title}</div>
      <div className={styles.rating}>
        <Rate disabled defaultValue={rating} className={styles.rate} />
        <span className={styles.count}>{rating} ({reviewCount})</span>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} />
      </div>
    </Card>
  );
}

export default React.memo(ProductCard);
