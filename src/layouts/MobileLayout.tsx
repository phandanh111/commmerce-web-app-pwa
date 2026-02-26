import React, { type ReactNode } from 'react';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppOutline, UnorderedListOutline, UserOutline, ShopbagOutline } from 'antd-mobile-icons';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const tabs = [
  { key: '/', title: 'Home', icon: <AppOutline /> },
  { key: '/categories', title: 'Category', icon: <UnorderedListOutline /> },
  { key: '/cart', title: 'Cart', icon: <ShopbagOutline /> },
  { key: '/profile', title: 'Profile', icon: <UserOutline /> },
];

function MobileLayout({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.mobileLayout}>
      <div className={styles.mobileContent}>
        {children}
      </div>
      <div className={styles.mobileTabBar}>
        <TabBar activeKey={pathname} onChange={value => navigate(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

export default React.memo(MobileLayout);
