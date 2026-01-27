import React, { useState } from 'react';
import { MailOutlined, FacebookFilled, TwitterSquareFilled, LinkedinFilled, UserOutlined, ShoppingCartOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import styles from './styles.module.scss';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path ? styles.active : '';

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className={styles.headerWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.mail}>
                    <MailOutlined /> hello@colorlib.com
                </div>
                <div>Free Shipping for all Order of $99</div>
            </div>
            <div className={styles.right}>
                <div className={styles.socials}>
                    <a href="#"><FacebookFilled /></a>
                    <a href="#"><TwitterSquareFilled /></a>
                    <a href="#"><LinkedinFilled /></a>
                </div>
                <div className={styles.auth}>
                    <UserOutlined /> Login
                </div>
            </div>
        </div>
      </div>
      
      {/* Main NavBar */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
            <div className={styles.hamburger} onClick={showDrawer}>
                <MenuOutlined />
            </div>

            <Link to="/" className={styles.logo}>
                <div style={{color: 'var(--primary-color)'}}><img src="/logo.png" alt="Ogani" style={{height: 50}} /></div> 
                {/* Fallback text if no logo image yet: PCD PWA */}
            </Link>
            
            <nav className={styles.nav}>
                <Link to="/" className={isActive('/')}>HOME</Link>
                <Link to="/shop" className={isActive('/shop')}>SHOP</Link>
                <Link to="/pages" className={isActive('/pages')}>PAGES</Link>
                <Link to="/blog" className={isActive('/blog')}>BLOG</Link>
                <Link to="/contact" className={isActive('/contact')}>CONTACT</Link>
            </nav>
            
            <div className={styles.cart}>
                <div className={styles.icon}>
                    <HeartOutlined />
                    <span>1</span>
                </div>
                <div className={styles.icon}>
                    <ShoppingCartOutlined />
                    <span>3</span>
                </div>
                <div className={styles.price}>item: <span>$150.00</span></div>
            </div>
        </div>
      </div>

      <Drawer title="Menu" placement="left" onClose={onClose} open={open}>
        <div className={styles.drawerMenu}>
            <Link to="/" onClick={onClose} className={isActive('/')}>HOME</Link>
            <Link to="/shop" onClick={onClose} className={isActive('/shop')}>SHOP</Link>
            <Link to="/pages" onClick={onClose} className={isActive('/pages')}>PAGES</Link>
            <Link to="/blog" onClick={onClose} className={isActive('/blog')}>BLOG</Link>
            <Link to="/contact" onClick={onClose} className={isActive('/contact')}>CONTACT</Link>
            
            <div className={styles.drawerSocials}>
                <a href="#"><FacebookFilled /></a>
                <a href="#"><TwitterSquareFilled /></a>
                <a href="#"><LinkedinFilled /></a>
            </div>
            <div className={styles.drawerAuth}>
                <UserOutlined /> Login
            </div>
        </div>
      </Drawer>
    </div>
  );
};

export default React.memo(Header);
