import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topBar}>
        Get 20% off your first order! 🌿 Order now and get it delivered within 30 minutes.
      </div>
      
      <div className={styles.mainHeader}>
        <Link to="/" className={styles.logo}>
            <div style={{color: 'var(--primary-color)'}}>FreshCart</div>
        </Link>
        
        <div className={styles.searchBar}>
            <Input 
                prefix={<EnvironmentOutlined style={{color: 'var(--secondary-text-color)'}} />}
                placeholder="Search for products, categories or brands..." 
                suffix={<SearchOutlined />}
                size="large"
            />
        </div>
        
        <div className={styles.actions}>
            <Button type="text" shape="circle" icon={<HeartOutlined />} />
            <Button type="text" shape="circle" icon={<UserOutlined />} />
            <div className={styles.iconBtn}>
                <ShoppingCartOutlined />
                <span className={styles.badge}>2</span>
            </div>
            <span>$24.00</span>
        </div>
      </div>
      
      <div className={styles.navBar}>
        <div className={styles.navContainer}>
            <div style={{ background: 'var(--primary-color)', color: 'white', padding: '10px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{fontWeight: 'bold'}}>All Categories</span>
            </div>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/stores">Stores</Link>
            <Link to="/mega-menu">Mega menu</Link>
            <Link to="/pages">Pages</Link>
            <Link to="/account">Account</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/docs">Docs</Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
