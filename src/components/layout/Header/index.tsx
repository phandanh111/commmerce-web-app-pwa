import React, { useState, useEffect } from 'react';
import {
  SearchOutlined, ShoppingCartOutlined, MenuOutlined,
  UserOutlined, HeartOutlined, LogoutOutlined,
  PhoneFilled, FacebookFilled, CloseOutlined,
} from '@ant-design/icons';
import { Drawer, Badge, Dropdown, Avatar, Input } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/constants/router';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { logout } from '@/stores/slices/authSlice';
import styles from './styles.module.scss';

const navLinks = [
  { path: ROUTES.HOME, label: 'Trang chủ' },
  { path: ROUTES.PRODUCTS, label: 'Sản phẩm' },
  { path: ROUTES.ABOUT, label: 'Giới thiệu' },
  { path: ROUTES.NEWS, label: 'Tin tức' },
  { path: ROUTES.SHOWROOM, label: 'Showroom' },
  { path: ROUTES.CONTACT, label: 'Liên hệ' },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  const userMenuItems = [
    { key: 'profile', label: <Link to={ROUTES.PROFILE}>Tài khoản của tôi</Link>, icon: <UserOutlined /> },
    { key: 'orders', label: <Link to={ROUTES.ORDERS}>Đơn hàng</Link>, icon: <ShoppingCartOutlined /> },
    { key: 'wishlist', label: <Link to={ROUTES.WISHLIST}>Yêu thích</Link>, icon: <HeartOutlined /> },
    { type: 'divider' as const },
    { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout, danger: true },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topInner}>
            <span className={styles.topLeft}>
              <PhoneFilled /> Hotline: <a href="tel:0326027020">03.2602.7020</a>
              <span className={styles.divider}>|</span>
              Miễn phí giao hàng cho đơn từ 500K
            </span>
            <div className={styles.topRight}>
              <a href="#" aria-label="Facebook"><FacebookFilled /></a>
              <a href="#" aria-label="Zalo" className={styles.zalo}>Zalo</a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className={styles.mainNav}>
          <div className={styles.navInner}>
            <button className={styles.hamburger} onClick={() => setDrawerOpen(true)} aria-label="Menu">
              <MenuOutlined />
            </button>

            <Link to={ROUTES.HOME} className={styles.logo}>
              <span className={styles.logoTop}>VƯƠNG GIA</span>
              <span className={styles.logoBottom}>✦ Yến Sào Cao Cấp ✦</span>
            </Link>

            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.span className={styles.activeDot} layoutId="activeDot" />
                  )}
                </Link>
              ))}
            </nav>

            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={() => setSearchOpen(!searchOpen)} aria-label="Tìm kiếm">
                {searchOpen ? <CloseOutlined /> : <SearchOutlined />}
              </button>

              <Link to={ROUTES.CART} className={styles.actionBtn} aria-label="Giỏ hàng">
                <Badge count={cartCount} size="small" color="var(--primary)">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>

              {isAuthenticated ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                  <button className={styles.actionBtn}>
                    <Avatar
                      size={28}
                      src={user?.information?.avatar}
                      icon={!user?.information?.avatar && <UserOutlined />}
                      style={{ background: 'var(--primary)', cursor: 'pointer' }}
                    />
                  </button>
                </Dropdown>
              ) : (
                <Link to={ROUTES.LOGIN} className={styles.loginBtn}>Đăng nhập</Link>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                className={styles.searchBar}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  autoFocus
                  size="large"
                  prefix={<SearchOutlined />}
                  placeholder="Tìm kiếm sản phẩm yến sào..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                  className={styles.searchInput}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={<span className={styles.drawerTitle}>VƯƠNG GIA Yến</span>}
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
      >
        <div className={styles.drawerMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.drawerLink} ${isActive(link.path) ? styles.drawerActive : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.drawerDivider} />
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.PROFILE} className={styles.drawerLink} onClick={() => setDrawerOpen(false)}>
                <UserOutlined /> Tài khoản
              </Link>
              <Link to={ROUTES.ORDERS} className={styles.drawerLink} onClick={() => setDrawerOpen(false)}>
                <ShoppingCartOutlined /> Đơn hàng
              </Link>
              <button className={`${styles.drawerLink} ${styles.logoutBtn}`} onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                <LogoutOutlined /> Đăng xuất
              </button>
            </>
          ) : (
            <Link to={ROUTES.LOGIN} className={`${styles.drawerLink} ${styles.drawerLoginBtn}`} onClick={() => setDrawerOpen(false)}>
              Đăng nhập / Đăng ký
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default React.memo(Header);
