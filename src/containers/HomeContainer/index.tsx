import React from 'react';
import { Row, Col } from 'antd';

import Hero from '@/components/home/Hero';
import ProductCard from '@/components/home/ProductCard';
import SectionTitle from '@/components/common/SectionTitle';

import styles from './styles.module.scss';

const mockProducts = [
  { id: 1, title: 'Chè Tổ Yến 3.2G (Chiếc)', category: 'Chè Tổ Yến', price: 190000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Che+To+Yen' },
  { id: 2, title: 'Chè Tổ Yến 6G (Chiếc)', category: 'Chè Tổ Yến', price: 260000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Che+6G' },
  { id: 3, title: 'Chè Tổ Yến Nguyên Tai 20G (Chiếc)', category: 'Chè Tổ Yến', price: 560000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Nguyen+Tai' },
  { id: 4, title: 'Tổ Yến Chưng Ngũ Vị 100ml (Lốc 10 lọ)', category: 'Yến Chưng Lọ 100ml', price: 680000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Ngu+Vi', badge: 'Bán chạy' },
  { id: 5, title: 'Tổ Yến Chưng Lá Dứa 100ml (Lốc 10 lọ)', category: 'Yến Chưng Lọ 100ml', price: 830000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=La+Dua' },
  { id: 6, title: 'Tổ Yến Chưng Đường 100ml (Lốc 10 lọ)', category: 'Yến Chưng Lọ 100ml', price: 630000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Duong' },
  { id: 7, title: 'Yến Tổ Thô Sạch 50G (Hộp)', category: 'Yến Tổ Thô Sạch', price: 2700000, originalPrice: 3000000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Tho+Sach' },
  { id: 8, title: 'Tổ Yến Thô 100Gr', category: 'Yến Tổ Thô Sạch', price: 3800000, originalPrice: 4500000, image: 'https://placehold.co/200x200/faf8f5/7B1A1A?text=Tho+100G', badge: 'Giảm giá' },
];

const HomeContainer: React.FC = () => {
    return (
        <div className={styles.container}>
            <Hero />

            <div className={styles.section}>
                <SectionTitle title="Chè Tổ Yến" />
                <Row gutter={[20, 20]}>
                    {mockProducts.filter(p => p.category === 'Chè Tổ Yến').map(product => (
                        <Col xs={24} sm={12} md={8} key={product.id}>
                            <ProductCard {...product} />
                        </Col>
                    ))}
                </Row>
            </div>

            <div className={styles.section}>
                <SectionTitle title="Dòng sản phẩm Lọ 100ml" />
                <Row gutter={[20, 20]}>
                    {mockProducts.filter(p => p.category === 'Yến Chưng Lọ 100ml').map(product => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <ProductCard {...product} />
                        </Col>
                    ))}
                </Row>
            </div>

            <div className={styles.section}>
                <SectionTitle title="Yến Tổ Thô Sạch" />
                <Row gutter={[20, 20]}>
                    {mockProducts.filter(p => p.category === 'Yến Tổ Thô Sạch').map(product => (
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
