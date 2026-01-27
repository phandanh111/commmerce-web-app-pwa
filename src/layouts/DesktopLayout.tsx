import React, { type ReactNode } from 'react';
import { Layout } from 'antd';

import Header from '@/components/layout/Header';

const { Content, Footer } = Layout;

type Props = {
  children: ReactNode;
};

const DesktopLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: 'var(--white)' }}> {/* Added className */}
      <Header />
      <Content style={{ padding: '0', background: 'var(--white)' }}> {/* Updated Content style */}
        {children}
      </Content>
      <Footer /> {/* Replaced AntD Footer with custom Footer component */}
    </Layout>
  );
};

export default DesktopLayout;
