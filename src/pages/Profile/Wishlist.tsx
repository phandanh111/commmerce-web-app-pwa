import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Empty, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { fetchWishlist, removeFromWishlist } from '@/stores/slices/wishlistSlice';
import { addToCart } from '@/stores/slices/cartSlice';
import { ROUTES } from '@/constants/router';
import styles from './wishlist.module.scss';

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.wishlist);

  useEffect(() => { dispatch(fetchWishlist()); }, [dispatch]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin /></div>;

  return (
    <div>
      <h2 className={styles.title}>Sản phẩm yêu thích ({items.length})</h2>
      {items.length === 0 ? (
        <Empty description="Chưa có sản phẩm yêu thích">
          <Link to={ROUTES.PRODUCTS}><Button type="primary">Khám phá sản phẩm</Button></Link>
        </Empty>
      ) : (
        <div className={styles.grid}>
          {items.map((w) => (
            <div key={w.id} className={styles.card}>
              <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', String(w.item.id))}>
                <img
                  src={w.item.image || `https://placehold.co/200x200/F8F0E3/C8A000?text=Yến`}
                  alt={w.item.name}
                  className={styles.img}
                />
              </Link>
              <div className={styles.info}>
                <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', String(w.item.id))} className={styles.name}>
                  {w.item.name}
                </Link>
                <span className={styles.price}>{formatPrice(w.item.price)}</span>
                <div className={styles.actions}>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => dispatch(addToCart({ itemId: w.item.id, quantity: 1 }))}
                    className={styles.addBtn}
                  >
                    Thêm vào giỏ
                  </Button>
                  <Button
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(removeFromWishlist(w.id))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
