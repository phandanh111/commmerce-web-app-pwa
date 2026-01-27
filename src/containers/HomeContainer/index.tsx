import React from 'react';
import { Row, Col } from 'antd';
import Hero from '@/components/home/Hero';
import HeroSidebar from '@/components/home/HeroSidebar';
import ProductCard from '@/components/home/ProductCard';

const mockProducts = [
  { id: 1, title: 'Tổ Yến Tinh Chế Loại 1 (100g)', category: 'Yến Tinh Chế', price: 350.00, rating: 5.0, reviewCount: 120, image: 'https://placehold.co/200x200?text=Yen+Tinh+Che', badge: 'Best Seller' },
  { id: 2, title: 'Yến Thô Nguyên Tổ (50g)', category: 'Yến Thô', price: 180.00, rating: 4.8, reviewCount: 85, image: 'https://placehold.co/200x200?text=Yen+Tho' },
  { id: 3, title: 'Hồng Yến Đảo Tự Nhiên', category: 'Hồng Yến', price: 450.00, rating: 5.0, reviewCount: 40, image: 'https://placehold.co/200x200?text=Hong+Yen' },
  { id: 4, title: 'Set 6 Hũ Yến Chưng Đường Phèn', category: 'Yến Chưng', price: 45.00, rating: 4.9, reviewCount: 200, image: 'https://placehold.co/200x200?text=Yen+Chung', badge: '-10%' },
  { id: 5, title: 'Yến Vụn Làm Sạch (100g)', category: 'Yến Vụn', price: 280.00, rating: 4.5, reviewCount: 60, image: 'https://placehold.co/200x200?text=Yen+Vun' },
  { id: 6, title: 'Nước Yến Sào Cao Cấp', category: 'Nước Yến', price: 15.00, rating: 4.6, reviewCount: 150, image: 'https://placehold.co/200x200?text=Nuoc+Yen' },
  { id: 7, title: 'Chân Yến Làm Sạch', category: 'Yến Tinh Chế', price: 300.00, rating: 4.7, reviewCount: 30, image: 'https://placehold.co/200x200?text=Chan+Yen' },
  { id: 8, title: 'Quà Tặng Yến Sào VIP', category: 'Quà Tặng', price: 500.00, rating: 5.0, reviewCount: 15, image: 'https://placehold.co/200x200?text=Qua+Tang' },
];

const HomeContainer: React.FC = () => {
  return (
    <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '0 15px' }}>
      <Row gutter={30}>
        <Col lg={6} md={0} xs={0} className="sidebar-col"> 
            <HeroSidebar />
        </Col>
        <Col lg={18} md={24} xs={24}>
            <Hero />
        </Col>
      </Row>

      <div style={{ marginTop: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontWeight: 700, position: 'relative' }}>
             Featured Products
             <div style={{ width: '80px', height: '4px', background: 'var(--primary-color)', margin: '15px auto 0' }}></div>
        </h2>
        
        <Row gutter={[30, 30]}>
            {mockProducts.map(product => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <ProductCard {...product} />
                </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default React.memo(HomeContainer);
