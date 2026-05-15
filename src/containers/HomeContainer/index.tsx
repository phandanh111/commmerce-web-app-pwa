import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Skeleton } from 'antd';
import {
  ArrowRightOutlined, ThunderboltOutlined, SafetyCertificateOutlined,
  CarOutlined, GiftOutlined, StarFilled,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { itemApi } from '@/api/item.api';
import ProductCard from '@/components/home/ProductCard';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

interface Item {
  id: number;
  name: string;
  price: number;
  image?: string;
  stock?: number;
  itemCategory?: { name: string };
}

interface Category {
  id: number;
  name: string;
}

const features = [
  { icon: <SafetyCertificateOutlined />, title: '100% Tự nhiên', desc: 'Không hóa chất, không phụ gia' },
  { icon: <ThunderboltOutlined />, title: 'Giao hàng nhanh', desc: 'Toàn quốc trong 2-3 ngày' },
  { icon: <CarOutlined />, title: 'Miễn phí vận chuyển', desc: 'Đơn hàng từ 500.000đ' },
  { icon: <GiftOutlined />, title: 'Quà tặng cao cấp', desc: 'Hộp quà sang trọng miễn phí' },
];

const testimonials = [
  { name: 'Nguyễn Thị Lan', text: 'Sản phẩm chất lượng tuyệt vời, mùi thơm tự nhiên. Tôi đã dùng 3 tháng và thấy sức khỏe cải thiện rõ rệt!', rating: 5 },
  { name: 'Trần Minh Khoa', text: 'Đóng gói đẹp, giao hàng nhanh. Mua làm quà biếu rất sang. Sẽ tiếp tục ủng hộ shop!', rating: 5 },
  { name: 'Lê Thu Hằng', text: 'Yến sào thật sự chất lượng, không lẫn tạp chất. Giá cả hợp lý so với thị trường.', rating: 5 },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const HomeContainer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, itemRes] = await Promise.all([
          itemApi.getCategories(),
          itemApi.getList({ limit: 12 }),
        ]);
        setCategories(catRes.data?.data || []);
        // Response: { data: { total, data: Item[] } }
        setProducts(itemRes.data?.data?.data || []);
      } catch {
        // Use empty arrays on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.heroTag}>✦ Yến Sào Cao Cấp ✦</span>
            <h1 className={styles.heroTitle}>
              Tinh hoa thiên nhiên<br />
              <span className={styles.heroHighlight}>dưỡng chất vàng</span>
            </h1>
            <p className={styles.heroDesc}>
              Yến sào Vương Gia — 100% tự nhiên, không chất bảo quản.<br />
              Bổ dưỡng cho cả gia đình từ trẻ em đến người lớn tuổi.
            </p>
            <div className={styles.heroActions}>
              <Link to={ROUTES.PRODUCTS} className={styles.heroCta}>
                Khám phá ngay <ArrowRightOutlined />
              </Link>
              <Link to={ROUTES.ABOUT} className={styles.heroSecondary}>
                Về chúng tôi
              </Link>
            </div>
          </motion.div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroBg} />
          <div className={styles.floatCard}>
            <span className={styles.floatIcon}>⭐</span>
            <div>
              <strong>4.9/5</strong>
              <p>10,000+ đánh giá</p>
            </div>
          </div>
          <div className={styles.floatCard2}>
            <span className={styles.floatIcon}>🏅</span>
            <div>
              <strong>15+ năm</strong>
              <p>Kinh nghiệm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.featureItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Danh mục sản phẩm</h2>
              <Link to={ROUTES.PRODUCTS} className={styles.viewAll}>
                Xem tất cả <ArrowRightOutlined />
              </Link>
            </div>
            <div className={styles.categoryGrid}>
              {categories.slice(0, 6).map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`${ROUTES.PRODUCTS}?categoryId=${cat.id}`}
                  className={styles.categoryCard}
                >
                  <div className={styles.catIcon}>{['🪺', '🍯', '🌿', '✨', '🎁', '💎'][i] || '🪺'}</div>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionTag}>Bán chạy nhất</span>
              <h2 className={styles.sectionTitle}>Sản phẩm nổi bật</h2>
            </div>
            <Link to={ROUTES.PRODUCTS} className={styles.viewAll}>
              Xem tất cả <ArrowRightOutlined />
            </Link>
          </div>

          {loading ? (
            <Row gutter={[20, 20]}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} md={8} lg={6}>
                  <Skeleton active style={{ padding: 16 }} />
                </Col>
              ))}
            </Row>
          ) : products.length > 0 ? (
            <Row gutter={[20, 24]}>
              {products.slice(0, 8).map((product) => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    stock={product.stock}
                    categoryName={product.itemCategory?.name}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div className={styles.emptyMsg}>Đang cập nhật sản phẩm...</div>
          )}
        </div>
      </section>

      {/* Banner CTA */}
      <section className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.bannerContent}>
            <div>
              <h2 className={styles.bannerTitle}>Ưu đãi đặc biệt hôm nay</h2>
              <p className={styles.bannerDesc}>Giảm ngay 15% cho đơn hàng đầu tiên khi đăng ký tài khoản mới</p>
            </div>
            <Link to={ROUTES.REGISTER} className={styles.bannerCta}>
              Đăng ký nhận ưu đãi
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionTag}>Khách hàng nói gì</span>
              <h2 className={styles.sectionTitle}>Đánh giá từ khách hàng</h2>
            </div>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarFilled key={j} className={styles.testimonialStar} />
                  ))}
                </div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>{t.name[0]}</div>
                  <strong>{t.name}</strong>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(HomeContainer);
