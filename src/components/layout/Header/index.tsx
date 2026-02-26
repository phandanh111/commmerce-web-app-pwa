import React, { useState } from 'react';
import { PhoneFilled, FacebookFilled, SearchOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const navLinks = [
  { path: ROUTES.HOME, label: 'Trang chủ' },
  { path: ROUTES.ABOUT, label: 'Giới thiệu' },
  { path: ROUTES.PRODUCTS, label: 'Sản phẩm' },
  { path: ROUTES.NEWS, label: 'Tin tức' },
  { path: ROUTES.SHOWROOM, label: 'Showroom' },
  { path: ROUTES.CONTACT, label: 'Liên Hệ' },
];

function Header({ className }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path ? styles.active : '';

  return (
    <div className={`${styles.headerWrapper} ${className || ''}`}>
      {/* Top Bar — Maroon with hotlines */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.hotlines}>
            <a href="tel:0362658888" className={styles.hotline}>
              <PhoneFilled /> 03.6265.8888
            </a>
            <a href="tel:0246265888" className={styles.hotline}>
              <PhoneFilled /> 024.6265.8888
            </a>
            <a href="tel:0286265888" className={styles.hotline}>
              <PhoneFilled /> 028.6265.8888
            </a>
          </div>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook"><FacebookFilled /></a>
            <a href="#" aria-label="Zalo">Zalo</a>
          </div>
        </div>
      </div>

      {/* Main NavBar */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <div className={styles.hamburger} onClick={() => setOpen(true)}>
            <MenuOutlined />
          </div>

          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>VƯƠNG GIA</span>
            <span className={styles.logoSub}>Yến</span>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={isActive(link.path)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn} aria-label="Search">
              <SearchOutlined />
            </button>
            <button type="button" className={styles.actionBtn} aria-label="Cart">
              <ShoppingCartOutlined />
            </button>
          </div>
        </div>
      </div>

      <Drawer title="Menu" placement="left" onClose={() => setOpen(false)} open={open}>
        <div className={styles.drawerMenu}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setOpen(false)} className={isActive(link.path)}>
              {link.label}
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default React.memo(Header);
