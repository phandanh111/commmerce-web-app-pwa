import React, { type ReactNode } from 'react';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppOutline, UnorderedListOutline, UserOutline, ShopbagOutline } from 'antd-mobile-icons';

type Props = {
  children: ReactNode;
};

const MobileLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const tabs = [
    {
      key: '/',
      title: 'Home',
      icon: <AppOutline />,
    },
    {
      key: '/categories',
      title: 'Category',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/cart',
      title: 'Cart',
      icon: <ShopbagOutline />,
    },
    {
      key: '/profile',
      title: 'Profile',
      icon: <UserOutline />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--background-color)' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
         <TabBar activeKey={pathname} onChange={value => navigate(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default MobileLayout;
