import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, InputNumber, Empty, Spin, Divider } from 'antd';
import { DeleteOutlined, ShoppingOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { fetchCart, updateCartItem, removeCartItem } from '@/stores/slices/cartSlice';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading } = useAppSelector((s) => s.cart);

  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);

  const total = items.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Giỏ hàng</h1>
          <span className={styles.count}>{itemCount} sản phẩm</span>
        </div>

        {loading ? (
          <div className={styles.spinWrap}><Spin size="large" /></div>
        ) : items.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty description="Giỏ hàng trống" image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Link to={ROUTES.PRODUCTS}>
                <Button type="primary" icon={<ShoppingOutlined />} className={styles.shopBtn}>
                  Mua sắm ngay
                </Button>
              </Link>
            </Empty>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Cart Items */}
            <div className={styles.itemsSection}>
              <AnimatePresence>
                {items.map((cartItem) => (
                  <motion.div
                    key={cartItem.id}
                    className={styles.cartItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.itemImage}>
                      <img
                        src={cartItem.item.image || `https://placehold.co/100x100/F8F0E3/C8A000?text=Yến`}
                        alt={cartItem.item.name}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', String(cartItem.item.id))} className={styles.itemName}>
                        {cartItem.item.name}
                      </Link>
                      <span className={styles.itemPrice}>{formatPrice(cartItem.item.price)}</span>
                    </div>
                    <div className={styles.itemQty}>
                      <InputNumber
                        min={1}
                        max={cartItem.item.stock}
                        value={cartItem.quantity}
                        onChange={(v) => {
                          if (v && v !== cartItem.quantity) {
                            dispatch(updateCartItem({ cartId: cartItem.id, quantity: v }));
                          }
                        }}
                        size="small"
                      />
                    </div>
                    <div className={styles.itemSubtotal}>
                      {formatPrice(cartItem.item.price * cartItem.quantity)}
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeCartItem(cartItem.id))}
                      type="button"
                      aria-label="Xóa"
                    >
                      <DeleteOutlined />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className={styles.summary}>
              <h3 className={styles.summaryTitle}>Tóm tắt đơn hàng</h3>

              <div className={styles.summaryRow}>
                <span>Tạm tính ({itemCount} sp)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển</span>
                <span className={styles.freeShip}>{total >= 500000 ? 'Miễn phí' : formatPrice(30000)}</span>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Tổng cộng</span>
                <span className={styles.totalPrice}>
                  {formatPrice(total + (total >= 500000 ? 0 : 30000))}
                </span>
              </div>

              {total < 500000 && (
                <p className={styles.freeShipHint}>
                  Mua thêm {formatPrice(500000 - total)} để được miễn phí vận chuyển
                </p>
              )}

              <Button
                type="primary"
                size="large"
                block
                icon={<ArrowRightOutlined />}
                onClick={() => navigate(ROUTES.CHECKOUT)}
                className={styles.checkoutBtn}
              >
                Tiến hành thanh toán
              </Button>

              <Link to={ROUTES.PRODUCTS} className={styles.continueShopping}>
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
