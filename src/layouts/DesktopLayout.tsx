import React, { type ReactNode } from 'react';
import { Layout } from 'antd';

import Header from '@/components/layout/Header';

const { Content, Footer } = Layout;

type Props = {
  children: ReactNode;
};

const DesktopLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <Header />
      <Content style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', background: 'var(--background-color)' }}>
        FreshCart ©{new Date().getFullYear()} Created by Antigravity
      </Footer>
    </Layout>
  );
};

export default DesktopLayout;
