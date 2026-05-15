import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Select, Input, Pagination, Skeleton, Empty, Tag } from 'antd';
import { SearchOutlined, AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { itemApi } from '@/api/item.api';
import ProductCard from '@/components/home/ProductCard';
import styles from './styles.module.scss';

interface Item {
  id: number;
  name: string;
  price: number;
  image?: string;
  stock?: number;
  itemCategory?: { id: number; name: string };
}

interface Category { id: number; name: string }

const PAGE_SIZE = 12;

const sortOptions = [
  { value: '', label: 'Mặc định' },
  { value: 'price_asc', label: 'Giá: Thấp đến cao' },
  { value: 'price_desc', label: 'Giá: Cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' },
];

const ProductsContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const sort = searchParams.get('sort') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await itemApi.getList({
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
        categoryId: categoryId || undefined,
        sort: sort || undefined,
      });
      // Response: { data: { total, data: Item[] } }
      const wrapper = res.data?.data;
      setProducts(wrapper?.data || []);
      setTotal(wrapper?.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryId, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    itemApi.getCategories().then((res) => setCategories(res.data?.data || [])).catch(() => {});
  }, []);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    params.delete('page');
    setSearchParams(params);
  };

  const selectedCat = categories.find((c) => String(c.id) === categoryId);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Sản phẩm</h1>
          <p className={styles.pageSub}>Khám phá bộ sưu tập yến sào cao cấp của Vương Gia</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterCard}>
              <h3 className={styles.filterTitle}><FilterOutlined /> Lọc sản phẩm</h3>
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Tìm kiếm</label>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tên sản phẩm..."
                  value={search}
                  onChange={(e) => updateParam('search', e.target.value)}
                  allowClear
                />
              </div>
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Danh mục</label>
                <div className={styles.catList}>
                  <button
                    className={`${styles.catItem} ${!categoryId ? styles.catActive : ''}`}
                    onClick={() => updateParam('categoryId', '')}
                    type="button"
                  >
                    Tất cả
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.catItem} ${String(cat.id) === categoryId ? styles.catActive : ''}`}
                      onClick={() => updateParam('categoryId', String(cat.id))}
                      type="button"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.main}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                {selectedCat && <Tag color="gold" closable onClose={() => updateParam('categoryId', '')}>{selectedCat.name}</Tag>}
                {search && <Tag closable onClose={() => updateParam('search', '')}>"{search}"</Tag>}
                {!loading && <span className={styles.totalCount}>{total} sản phẩm</span>}
              </div>
              <div className={styles.toolbarRight}>
                <Select value={sort} onChange={(v) => updateParam('sort', v)} options={sortOptions} style={{ width: 180 }} placeholder="Sắp xếp" />
                <div className={styles.viewToggle}>
                  <button className={viewMode === 'grid' ? styles.viewActive : ''} onClick={() => setViewMode('grid')} type="button"><AppstoreOutlined /></button>
                  <button className={viewMode === 'list' ? styles.viewActive : ''} onClick={() => setViewMode('list')} type="button"><BarsOutlined /></button>
                </div>
              </div>
            </div>

            {loading ? (
              <Row gutter={[20, 20]}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Col key={i} xs={24} sm={12} md={8} lg={6}><Skeleton active style={{ padding: 16 }} /></Col>
                ))}
              </Row>
            ) : products.length === 0 ? (
              <div className={styles.empty}><Empty description="Không tìm thấy sản phẩm nào" /></div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Row gutter={[20, 24]}>
                  {products.map((p) => (
                    <Col key={p.id} xs={24} sm={12} md={viewMode === 'grid' ? 8 : 24} lg={viewMode === 'grid' ? 6 : 24}>
                      <ProductCard id={p.id} name={p.name} price={p.price} image={p.image} stock={p.stock} categoryName={p.itemCategory?.name} />
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {total > PAGE_SIZE && (
              <div className={styles.pagination}>
                <Pagination
                  current={page} total={total} pageSize={PAGE_SIZE} showSizeChanger={false}
                  onChange={(p) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', String(p));
                    setSearchParams(params);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductsContainer);
