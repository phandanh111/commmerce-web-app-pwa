import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Avatar } from 'antd';
import {
  UserOutlined, ShoppingOutlined, HeartOutlined,
  EnvironmentOutlined, LockOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '@/stores/Store';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

const menuItems = [
  { path: ROUTES.PROFILE, label: 'Tài khoản của tôi', icon: <UserOutlined />, exact: true },
  { path: ROUTES.ORDERS, label: 'Đơn hàng', icon: <ShoppingOutlined /> },
  { path: ROUTES.WISHLIST, label: 'Yêu thích', icon: <HeartOutlined /> },
  { path: ROUTES.ADDRESSES, label: 'Địa chỉ giao hàng', icon: <EnvironmentOutlined /> },
  { path: ROUTES.CHANGE_PASSWORD, label: 'Đổi mật khẩu', icon: <LockOutlined /> },
];

const ProfileLayout: React.FC = () => {
  const { user } = useAppSelector((s) => s.auth);
  const location = useLocation();

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              <Avatar
                size={72}
                src={user?.information?.avatar}
                icon={!user?.information?.avatar && <UserOutlined />}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <strong className={styles.userName}>
                  {user?.information?.fullName || user?.email?.split('@')[0] || 'Khách hàng'}
                </strong>
                <span className={styles.userEmail}>{user?.email}</span>
              </div>
            </div>

            <nav className={styles.menu}>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.menuItem} ${isActive(item.path, item.exact) ? styles.menuActive : ''}`}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
