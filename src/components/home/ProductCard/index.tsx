import React from 'react';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  image: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
};

function ProductCard({ className, image, title, category, price, originalPrice, badge }: Props) {
  const formatPrice = (value: number) =>
    value.toLocaleString('vi-VN') + 'đ';

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.imageWrapper}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <img src={image} alt={title} />
      </div>
      <div className={styles.info}>
        <div className={styles.category}>{category}</div>
        <div className={styles.title} title={title}>{title}</div>
        <div className={styles.priceRow}>
          {originalPrice && (
            <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
          )}
          <span className={styles.price}>{formatPrice(price)}</span>
        </div>
        <button type="button" className={styles.orderBtn}>Đặt hàng</button>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
