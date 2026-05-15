import React from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, StarFilled, EyeOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { addToCart } from '@/stores/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/stores/slices/wishlistSlice';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

interface Props {
  id: number;
  name: string;
  price: number;
  image?: string;
  stock?: number;
  badge?: string;
  categoryName?: string;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const ProductCard: React.FC<Props> = ({
  id, name, price, image, stock = 0, badge, categoryName,
  originalPrice, rating, reviewCount,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const wishlistItem = wishlistItems.find((w) => w.item.id === id);
  const isWishlisted = !!wishlistItem;
  const discountPct = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { message.warning('Vui lòng đăng nhập để mua hàng'); return; }
    if (stock === 0) { message.error('Sản phẩm đã hết hàng'); return; }
    await dispatch(addToCart({ itemId: id, quantity: 1 }));
    message.success('Đã thêm vào giỏ hàng!');
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { message.warning('Vui lòng đăng nhập'); return; }
    if (isWishlisted && wishlistItem) {
      await dispatch(removeFromWishlist(wishlistItem.id));
      message.success('Đã xóa khỏi yêu thích');
    } else {
      await dispatch(addToWishlist(id));
      message.success('Đã thêm vào yêu thích!');
    }
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={styles.card}>
      <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', String(id))} className={styles.imageWrap}>
        <img
          src={image || `https://placehold.co/300x300/F8F0E3/C8A000?text=Yến`}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
        {badge && <span className={styles.badge}>{badge}</span>}
        {discountPct > 0 && <span className={styles.discountBadge}>-{discountPct}%</span>}
        {stock === 0 && <div className={styles.outOfStock}>Hết hàng</div>}
        <div className={styles.overlay}>
          <button className={styles.overlayBtn} title="Xem chi tiết" type="button">
            <EyeOutlined />
          </button>
        </div>
      </Link>

      <div className={styles.content}>
        {categoryName && <span className={styles.category}>{categoryName}</span>}
        <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', String(id))} className={styles.name}>
          {name}
        </Link>
        {rating !== undefined && (
          <div className={styles.rating}>
            <StarFilled className={styles.star} />
            <span>{rating.toFixed(1)}</span>
            {reviewCount !== undefined && <span className={styles.ratingCount}>({reviewCount})</span>}
          </div>
        )}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(price)}</span>
          {originalPrice && <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>}
        </div>
        <div className={styles.actions}>
          <button className={styles.cartBtn} onClick={handleAddToCart} disabled={stock === 0} type="button">
            <ShoppingCartOutlined />
            <span>Thêm vào giỏ</span>
          </button>
          <button
            className={`${styles.wishBtn} ${isWishlisted ? styles.wishlisted : ''}`}
            onClick={handleWishlist}
            aria-label="Yêu thích"
            type="button"
          >
            {isWishlisted ? <HeartFilled /> : <HeartOutlined />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
