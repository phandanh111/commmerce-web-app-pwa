import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Button, InputNumber, Rate, Spin, Divider, message, Empty, Avatar } from 'antd';
import {
  ShoppingCartOutlined, HeartOutlined, HeartFilled,
  CheckCircleFilled, UserOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { itemApi } from '@/api/item.api';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { addToCart } from '@/stores/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/stores/slices/wishlistSlice';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

interface Review { id: number; rating: number; comment: string; createdAt: string; account?: { information?: { fullName?: string; avatar?: string } } }
interface ItemDetail {
  id: number; name: string; price: number; image?: string; stock: number;
  itemCategory?: { name: string }; description?: string;
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const wishlistItem = wishlistItems.find((w) => w.item.id === Number(id));
  const isWishlisted = !!wishlistItem;

  const [item, setItem] = useState<ItemDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const [itemRes, reviewRes] = await Promise.all([
          itemApi.getDetail(id),
          itemApi.getReviews(id),
        ]);
        setItem(itemRes.data?.data);
        setReviews(reviewRes.data?.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) { message.warning('Vui lòng đăng nhập'); return; }
    if (!item || item.stock === 0) { message.error('Sản phẩm hết hàng'); return; }
    await dispatch(addToCart({ itemId: item.id, quantity: qty }));
    message.success(`Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) { message.warning('Vui lòng đăng nhập'); return; }
    if (isWishlisted && wishlistItem) {
      await dispatch(removeFromWishlist(wishlistItem.id));
      message.success('Đã xóa khỏi yêu thích');
    } else if (item) {
      await dispatch(addToWishlist(item.id));
      message.success('Đã thêm vào yêu thích!');
    }
  };

  const handleReview = async () => {
    if (!isAuthenticated) { message.warning('Vui lòng đăng nhập để đánh giá'); return; }
    if (!reviewComment.trim()) { message.warning('Nhập nội dung đánh giá'); return; }
    setSubmitting(true);
    try {
      await itemApi.createReview(id!, { rating: reviewRating, comment: reviewComment });
      message.success('Cảm ơn đánh giá của bạn!');
      setReviewComment('');
      const res = await itemApi.getReviews(id!);
      setReviews(res.data?.data || []);
    } catch {
      message.error('Không thể gửi đánh giá');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  if (loading) return <div className={styles.spinWrap}><Spin size="large" /></div>;
  if (!item) return <div className={styles.spinWrap}><Empty description="Sản phẩm không tồn tại" /></div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb className={styles.breadcrumb} items={[
          { title: <Link to={ROUTES.HOME}>Trang chủ</Link> },
          { title: <Link to={ROUTES.PRODUCTS}>Sản phẩm</Link> },
          { title: item.name },
        ]} />

        <div className={styles.productGrid}>
          {/* Image */}
          <motion.div className={styles.imageSection} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className={styles.mainImage}>
              <img
                src={item.image || `https://placehold.co/500x500/F8F0E3/C8A000?text=Yến`}
                alt={item.name}
              />
              {item.stock === 0 && <div className={styles.outOfStock}>Hết hàng</div>}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div className={styles.infoSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {item.itemCategory && <span className={styles.category}>{item.itemCategory.name}</span>}
            <h1 className={styles.productName}>{item.name}</h1>

            {reviews.length > 0 && (
              <div className={styles.ratingRow}>
                <Rate disabled value={avgRating} allowHalf style={{ fontSize: 16 }} />
                <span className={styles.ratingText}>{avgRating.toFixed(1)} ({reviews.length} đánh giá)</span>
              </div>
            )}

            <div className={styles.price}>{formatPrice(item.price)}</div>

            <div className={styles.stockInfo}>
              {item.stock > 0 ? (
                <span className={styles.inStock}><CheckCircleFilled /> Còn hàng ({item.stock} sản phẩm)</span>
              ) : (
                <span className={styles.outStockText}>Hết hàng</span>
              )}
            </div>

            {item.description && <p className={styles.desc}>{item.description}</p>}

            <div className={styles.buySection}>
              <div className={styles.qtyRow}>
                <label>Số lượng:</label>
                <InputNumber
                  min={1}
                  max={item.stock}
                  value={qty}
                  onChange={(v) => setQty(v || 1)}
                  disabled={item.stock === 0}
                />
              </div>

              <div className={styles.btnRow}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={item.stock === 0}
                  className={styles.addToCartBtn}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  size="large"
                  icon={isWishlisted ? <HeartFilled style={{ color: '#EF4444' }} /> : <HeartOutlined />}
                  onClick={handleWishlist}
                  className={styles.wishBtn}
                />
              </div>
            </div>

            <div className={styles.badges}>
              <span className={styles.badge}>🌿 100% Tự nhiên</span>
              <span className={styles.badge}>🚚 Giao hàng toàn quốc</span>
              <span className={styles.badge}>🔄 Đổi trả 7 ngày</span>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <Divider />
        <div className={styles.reviewSection}>
          <h2 className={styles.reviewTitle}>Đánh giá sản phẩm</h2>

          {/* Write Review */}
          {isAuthenticated && (
            <div className={styles.writeReview}>
              <h4>Viết đánh giá của bạn</h4>
              <Rate value={reviewRating} onChange={setReviewRating} />
              <textarea
                className={styles.reviewTextarea}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
              <Button type="primary" onClick={handleReview} loading={submitting} className={styles.submitReviewBtn}>
                Gửi đánh giá
              </Button>
            </div>
          )}

          {/* Review List */}
          {reviews.length === 0 ? (
            <Empty description="Chưa có đánh giá nào" style={{ margin: '40px 0' }} />
          ) : (
            <div className={styles.reviewList}>
              {reviews.map((r) => (
                <div key={r.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <Avatar icon={<UserOutlined />} src={r.account?.information?.avatar} />
                    <div>
                      <strong>{r.account?.information?.fullName || 'Khách hàng'}</strong>
                      <div className={styles.reviewMeta}>
                        <Rate disabled value={r.rating} style={{ fontSize: 12 }} />
                        <span>{new Date(r.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
