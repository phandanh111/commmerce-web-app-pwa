import React from 'react';
import { Row, Col } from 'antd';
import Hero from '@/components/home/Hero';
import ProductCard from '@/components/home/ProductCard';

const mockProducts = [
  { id: 1, title: 'Organic Green Big Sweet Pepper Seeds', category: 'Vegetables', price: 24.00, rating: 4.8, reviewCount: 24, image: 'https://placehold.co/200x200?text=Pepper', badge: 'Best Seller' },
  { id: 2, title: 'Organic 100% Italian Hass Natural Avocado', category: 'Fruits', price: 12.35, rating: 4.5, reviewCount: 50, image: 'https://placehold.co/200x200?text=Avocado' },
  { id: 3, title: 'Premium Cavendish Banana - Import Quality', category: 'Fruits', price: 3.40, rating: 4.5, reviewCount: 12, image: 'https://placehold.co/200x200?text=Banana' },
  { id: 4, title: 'Full Cream Fresh Milk - Pasteurised', category: 'Dairy', price: 2.95, rating: 4.7, reviewCount: 32, image: 'https://placehold.co/200x200?text=Milk' },
  { id: 5, title: 'Zesty Italian Lemons - Organic Harvest', category: 'Fruits', price: 4.40, rating: 4.6, reviewCount: 45, image: 'https://placehold.co/200x200?text=Lemon' },
];

const HomeContainer: React.FC = () => {
  return (
    <div>
      <Hero />
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>All Products</h2>
        <Row gutter={[24, 24]}>
            {mockProducts.map(product => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={product.id}>
                    <ProductCard {...product} />
                </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default React.memo(HomeContainer);
